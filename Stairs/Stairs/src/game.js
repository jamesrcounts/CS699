"use strict";

function Board(id) {
    this.pieces = [];
    this.width = 320;
    this.height = 500;
    this.canvas = document.getElementById(id);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.stage = new createjs.Stage(this.canvas);
    this.world = new box2d.World(new box2d.Vector(0, 10), true);
    this.scale = 30;
}

Board.prototype.addSprite = function (s) {
    this.stage.addChild(s.displayObject);
    this.pieces.push(s);
};

Board.prototype.addBody = function (b) {
    if (!b.bodyDefinition) {
        throw "b has no bodyDefinition";
    }

    if (!b.fixtureDefinition) {
        throw "b has no fixtureDefinition";
    }

    b.body = this.world.CreateBody(b.bodyDefinition);
    b.body.CreateFixture(b.fixtureDefinition);
};

Board.prototype.addPiece = function (p) {
    if (p.isPhysical) {
        this.addBody(p);
    }

    this.addSprite(p);
};

Board.prototype.addPieces = function (n, creator) {
    for (var i = 0; i < n; i++) {
        this.addPiece(creator(this));
    }
};

Board.prototype.update = function () {
    this.world.Step(1 / 60, 10, 10);
    //this.world.DrawDebugData();
    this.world.ClearForces();

    var l = this.pieces.length;
    for (var i = 0; i < l; i++) {
        this.pieces[i].update(this.width, this.height);
    }

    this.stage.update();
};

function KeyboardControls(id) {
    var that = this;
    this.canvas = document.getElementById(id);
    document.addEventListener('keydown', function (event) {
        that.onkeydown(event);
    }, false);
}

KeyboardControls.prototype.onkeydown = function (e) {
    e = e || event;
    var key = e.keyCode;
    if (key === 37) {
        this.moveLeft();
    } else if (key === 38) {
        this.moveUp();
    } else if (key === 39) {
        this.moveRight();
    }
};

KeyboardControls.prototype.moveLeft = function () {

};

KeyboardControls.prototype.moveRight = function () {

};

KeyboardControls.prototype.moveUp = function () {
};

var game = (function () {

    var board = new Board('game');
    board.addPiece(createBackground(board));
    board.addPieces(10, createCloud);
    board.addPiece(createPlayer(board));

    var hBoundary = {
        scale: board.scale,
        width: board.width,
        height: 0.5,
        x: board.width / 2,
        y: board.height - 1
    };
    board.addPiece(createBoundary(hBoundary));
    hBoundary.y = 1;
    board.addPiece(createBoundary(hBoundary));
    
    //var controls = new KeyboardControls('game');
    //controls.moveLeft = function () {
    //    player.moveLeft();
    //};
    //controls.moveRight = function () {
    //    player.moveRight();
    //};
    //controls.moveUp = function() {
    //    player.jump();
    //};



    //var leftWall = createBoundary({
    //    scale: 30,
    //    width: 0.5,
    //    height: b.height,
    //    x: 1,
    //    y: b.height / 2
    //});
    //b.addPiece(leftWall);

    //var rightWall = Object.create(leftWall);
    //rightWall.bodyDefinition.position.x = (b.width - 1) / rightWall.scale;
    //b.addPiece(rightWall);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.addEventListener("tick", function () {
        board.update();
    });
    return {};
})();
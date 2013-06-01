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
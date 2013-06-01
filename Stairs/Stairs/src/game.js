"use strict";

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
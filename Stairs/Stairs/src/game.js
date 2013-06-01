"use strict";

function createContactListener() {
    var listener = new box2d.ContactListener();
    listener.PreSolve = function(contact, impulse) {
        var alpha = contact.GetFixtureA();
        var beta = contact.GetFixtureB();
    };
    return listener;
}

var game = (function () {

    var board = createBoard('game');
    board.addPiece(createBackground(board));
    board.addPieces(10, createCloud);
    board.addPieces(1, createPlatform);

    var player = createPlayer(board);
    var controls = createKeyboardControls();
    controls.moveLeft = function () {
        player.moveLeft();
    };
    controls.moveRight = function () {
        player.moveRight();
    };
    controls.moveUp = function () {
        player.jump();
    };
    board.addPiece(player);

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

    var vBoundary = {
        scale: 30,
        width: 0.5,
        height: board.height,
        x: 1,
        y: board.height / 2
    };
    board.addPiece(createBoundary(vBoundary));
    vBoundary.x = board.width - 1;
    board.addPiece(createBoundary(vBoundary));

    createjs.Ticker.setFPS(60);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.addEventListener("tick", function () {
        board.update();
    });
    return {};
})();

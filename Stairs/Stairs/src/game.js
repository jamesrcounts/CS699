"use strict";

var game = (function () {
    var board;
    board = createBoard('game');
    board.addPiece(createBackground(board));
    board.addPieces(10, createCloud);

    board.addPieces(7, createPlatform, evenVerticalSpacing);

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
        width: board.width(),
        height: 0.5,
        x: board.width() / 2,
        y: board.height - 1,
        id: "ground"
    };
    var ground = createBoundary(hBoundary);
    board.addPiece(ground);
    hBoundary.y = 1;
    hBoundary.id = "roof";
    board.addPiece(createBoundary(hBoundary));

    var vBoundary = {
        scale: 30,
        width: 0.5,
        height: board.height,
        x: 1,
        y: board.height / 2
    };
    board.addPiece(createBoundary(vBoundary));
    vBoundary.x = board.width() - 1;
    board.addPiece(createBoundary(vBoundary));

    board.addContactListener(createContactListener());

    //board.debug();

    createjs.Ticker.setFPS(60);
    createjs.Ticker.useRAF = true;
    var update = function () {
        board.update();
    };

    createjs.Ticker.addEventListener("tick", update);
    ground.onContact = function () {
        createjs.Ticker.removeEventListener("tick", update);
    };

    return {
        boardSize: function () { return this; }
    };
})();

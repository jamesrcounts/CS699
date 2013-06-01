"use strict";

var game = (function () {

    var board = createBoard('game');
    board.addPiece(createBackground(board));
    board.addPieces(10, createCloud);
    
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
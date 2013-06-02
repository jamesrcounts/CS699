"use strict";

function createContactListener() {
    var listener = new box2d.ContactListener();
    listener.PreSolve = function (contact) {

        var player = null;

        var alpha = contact.GetFixtureA().GetBody();
        var alphaPiece = alpha.GetUserData();
        if (alphaPiece.isPiece("player")) {
            player = alphaPiece;
        }

        var beta = contact.GetFixtureB().GetBody();
        var betaPiece = beta.GetUserData();
        if (player === null && betaPiece.isPiece("player")) {
            player = betaPiece;
        }

        if (player === null) {
            return;
        }

        var platform = player === alphaPiece ? betaPiece : alphaPiece;
        if (!platform.isPiece("platform")) {
            return;
        }

        var foot = (player.body.GetPosition().y * player.scale) + (player.height / 2);
        var head = (platform.body.GetPosition().y * platform.scale) - (platform.height / 2);
        if (head < foot) {
            contact.SetEnabled(false);
        }

        return;
    };
    return listener;
}

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

    board.addContactListener(createContactListener());

    //board.debug();

    createjs.Ticker.setFPS(60);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.addEventListener("tick", function () {
        board.update();
    });
    return {};
})();

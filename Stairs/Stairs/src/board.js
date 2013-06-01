"use strict";

function createBoard(canvasId) {
    var board = {};
    board.pieces = [];
    board.width = 320;
    board.height = 500;
    board.canvas = document.getElementById(canvasId);
    board.canvas.width = board.width;
    board.canvas.height = board.height;
    board.stage = new createjs.Stage(board.canvas);
    board.world = new box2d.World(new box2d.Vector(0, 10), true);
    board.scale = 30;
    board.addSprite = function (s) {
        this.stage.addChild(s.displayObject);
        this.pieces.push(s);
    };
    board.addBody = function (b) {
        if (!b.bodyDefinition) {
            throw "b has no bodyDefinition";
        }

        if (!b.fixtureDefinition) {
            throw "b has no fixtureDefinition";
        }

        b.body = this.world.CreateBody(b.bodyDefinition);
        b.body.CreateFixture(b.fixtureDefinition);
    };
    board.addPiece = function (p) {
        if (p.isPhysical) {
            this.addBody(p);
        }

        this.addSprite(p);
    };
    board.addPieces = function (n, creator) {
        for (var i = 0; i < n; i++) {
            this.addPiece(creator(this));
        }
    };
    board.update = function () {
        this.world.Step(1 / 60, 10, 10);
        this.world.ClearForces();

        var l = this.pieces.length;
        for (var i = 0; i < l; i++) {
            this.pieces[i].update(this.width, this.height);
        }

        this.stage.update();
    };
    return board;
}

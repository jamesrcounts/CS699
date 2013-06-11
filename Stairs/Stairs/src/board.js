"use strict";

function createBoard(canvasId) {
    var board, defaultWidth;
    board = {};
    defaultWidth = 320;
    board.pieces = [];

    board.canvas = document.getElementById(canvasId);
    board.canvas.width = defaultWidth;
    board.canvas.height = 500;

    board.width = function (w) {
        if (w) {
            this.canvas.width = w;
        }

        return this.canvas.width;
    };

    board.height = function () { return this.canvas.height; };

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
        b.body.SetUserData(b);
    };

    board.addContactListener = function (l) {
        this.world.SetContactListener(l);
    };

    board.addPiece = function (p) {
        if (p.isPhysical) {
            this.addBody(p);
        }

        this.addSprite(p);
    };

    board.addPieces = function (n, creator, spacerFactory) {
        var spacer, i;
        
        spacerFactory = spacerFactory || randomSpacing;
        spacer = spacerFactory(this, n);

        for (i = 0; i < n; i++) {
            this.addPiece(creator(this, spacer()));
        }

        return this;
    };

    board.debug = function () {
        var debugDraw;
        this.debugging = true;

        debugDraw = new box2d.DebugDraw();
        debugDraw.SetSprite(this.canvas.getContext("2d"));
        debugDraw.SetDrawScale(30.0);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(box2d.Debug.Shape | box2d.Debug.Joint);
        this.world.SetDebugDraw(debugDraw);
    };

    board.size = function (boardSize) {
        var factor;
        switch (true) {
            case /huge/i.test(boardSize):
                factor = 3;
                break;
            case /medium/i.test(boardSize):
                factor = 2;
                break;
            default:
                factor = 1;
        }

        this.width(defaultWidth * factor);
        return this;
    };
    
    board.update = function () {
        this.world.Step(1 / 60, 10, 10);
        this.world.ClearForces();

        var l = this.pieces.length;
        for (var i = 0; i < l; i++) {
            this.pieces[i].update(this.width(), this.height());
        }

        if (this.debugging) {
            this.world.DrawDebugData();
        } else {
            this.stage.update();
        }
    };
    return board;
}

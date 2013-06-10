"use strict";

function createBoard(canvasId) {
    var board = {};
    board.pieces = [];
    board.width = function () { return 320; };
    board.height = 500;
    board.canvas = document.getElementById(canvasId);
    board.canvas.width = board.width();
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
        var spacer, i, that;
        that = this;
        spacerFactory = spacerFactory || function () {
            return function () {
                return {
                    x: Math.random() * that.width(),
                    y: Math.random() * that.height
                };
            };
        };

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
    board.update = function () {
        this.world.Step(1 / 60, 10, 10);
        this.world.ClearForces();

        var l = this.pieces.length;
        for (var i = 0; i < l; i++) {
            this.pieces[i].update(this.width(), this.height);
        }

        if (this.debugging) {
            this.world.DrawDebugData();
        } else {
            this.stage.update();
        }
    };
    return board;
}

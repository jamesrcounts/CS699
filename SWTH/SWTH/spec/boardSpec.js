describe("A new board", function () {
    //it("requires a canvas", function () {
    //    expect(function () { new sth.Board() })
    //        .toThrow(new Error("You must initialize a Board with a Canvas reference"));
    //});
    it("creates a box2d world", function () {
        var board = new sth.Board({});
        expect(board.world instanceof box2d.World).toBeTruthy();
    });
    it("is 320x500 by default", function () {
        var board = new sth.Board({});
        expect(board.size).toEqual({ width: 320, height: 500 });
    });
    it("initializes the canvas with its own dimensions", function () {
        var canvas = jasmine.createSpyObj('canvas', ['width', 'height']);
        new sth.Board(canvas);
        expect(canvas.width).toEqual(320);
        expect(canvas.height).toEqual(500);
    });
});

describe("A board's relationship with a platform", function () {
    it("accept platforms as children", function () {
        var board = new sth.Board({});
        var platform = new sth.Platform(30, { x: 160, y: 250 }, { horizontal: 35, vertical: 10 });
        var world = new box2d.World(new box2d.Vector(0, 10), true);
        var fixDef = new box2d.FixtureDefinition();
        fixDef.density = 1.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 1; 
        fixDef.shape = new box2d.Polygon();
        fixDef.shape.SetAsBox(35 / 30, 10 / 30);
        var bodyDef = new box2d.BodyDefinition();
        bodyDef.type = box2d.Body.Static;
        bodyDef.position.x = 160;
        bodyDef.position.y = 250;
        var box = world.CreateBody(bodyDef);
        box.CreateFixture(fixDef);
        box.userData = platform;
        board.addPlatform(platform);
        expect(platform.body.userData).toEqual(platform);
    });
});

describe("A board's compare to X function", function () {
    it("returns 0 when the point is in bounds", function () {
        var board = new sth.Board({});
        var point = { x: 100, y: 100 };
        expect(board.compareToX(point)).toEqual(0);
    });
    it("returns -1 when the point is out of bounds to the left", function () {
        var board = new sth.Board({});
        var point = { x: -100, y: 100 };
        expect(board.compareToX(point)).toEqual(-1);
    });
    it("returns 1 when the point is out of bounds to the right", function () {
        var board = new sth.Board({});
        var point = { x: 500, y: 100 };
        expect(board.compareToX(point)).toEqual(1);
    });
});

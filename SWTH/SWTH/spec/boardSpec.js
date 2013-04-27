var canvas = jasmine.createSpyObj('canvas', ['width', 'height', 'addEventListener']);

describe("The player", function () {
    var player = new sth.Player(30, { x: 160, y: 250 });
    it("creates a box2D body definition", function () {
        var bodyDef = new box2d.BodyDefinition();
        bodyDef.type = box2d.Body.Dynamic;
        bodyDef.position.x = 160 / 30;
        bodyDef.position.y = 250 / 30;

        expect(player.bodyDef).toEqual(bodyDef);
    });

    it("creates a box2d fixture definition", function () {
        var fixDef = new box2d.FixtureDefinition();
        fixDef.density = 1.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 1;
        fixDef.shape = new box2d.Shape.Polygon();
        fixDef.shape.SetAsBox(65 / 2 / 30, 95 / 2 / 30);
        expect(player.fixDef).toEqual(fixDef);
    });


    it("creates a createjs DisplayObject", function() {
        expect(player.displayObject instanceof createjs.DisplayObject).toBeTruthy();
    });
});

describe("A new board", function () {
    it("is blue", function () {
        expect(new window.sth.Board(canvas).color).toEqual('#d0e7f9');
    });
    it("creates a box2d world", function () {
        var board = new window.sth.Board(canvas);
        expect(board.world instanceof box2d.World).toBeTruthy();
    });
    it("creates an easeljs canvas", function () {
        var board = new sth.Board(canvas);
        expect(board.stage instanceof createjs.Stage).toBeTruthy();
    });
    it("is 320x500 by default", function () {
        var board = new sth.Board(canvas);
        expect(board.size()).toEqual({ width: 320, height: 500 });
    });
    it("initializes the canvas with its own dimensions", function () {

        var board = new sth.Board(canvas);
        expect(canvas.width).toEqual(320);
        expect(canvas.height).toEqual(500);
    });
    it('is 960x500 when huge', function () {
        var board = new sth.Board(canvas);
        board.size('huge');
        expect(board.size()).toEqual({ width: 960, height: 500 });
    });
});

describe("A board's boundary function", function () {
    it("is true when the point is out of bounds to the left", function () {
        var board = new sth.Board(canvas);
        var point = { x: -100, y: 100 };
        expect(board.outOfBounds(point.x)).toBeTruthy();
    });
    it("is true when the point is out of bounds to the right", function () {
        var board = new sth.Board(canvas);
        var point = { x: 500, y: 100 };
        expect(board.outOfBounds(point.x)).toBeTruthy();
    });
});

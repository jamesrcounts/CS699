describe("A new board", function () {
    it("requires a canvas", function () {
        expect(function () { new sth.Board() })
            .toThrow(new Error("You must initialize a Board with a Canvas reference"));
    });
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
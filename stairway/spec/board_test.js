describe("Board drawing", function () {
    var context = new ContextMock();
    var canvas = {};
    var board = new Board();
    beforeEach(function () {
        spyOn(context, 'beginPath');
        spyOn(context, 'rect');
        spyOn(context, 'closePath');
        spyOn(context, 'fill');
        board.draw(canvas, context);
    });
    it('sets the canvas size', function () {
        var size = board.getSize();
        expect(canvas.width).toEqual(size.width);
        expect(canvas.height).toEqual(size.height);
    });
    it('begins drawing a path', function () {
        expect(context.beginPath).toHaveBeenCalled();
    });
    it('draws a rectangle', function () {
        expect(context.rect).toHaveBeenCalledWith(0, 0, board.getSize().width, board.getSize().height);
    });
    it('finishes drawing the path', function () {
        expect(context.closePath).toHaveBeenCalled();
    });
    it('uses the board color', function () {
        expect(context.fillStyle).toEqual(board.getColor());
    });
    it('paints the canvas', function () {
        expect(context.fill).toHaveBeenCalled();
    });
});

describe("The board", function () {
    var board = new Board();
    it("is blue", function () {
        expect(board.getColor()).toEqual('#d0e7f9');
    });
    it('is 320x500 by default', function () {
        expect(board.getSize()).toEqual({width: 320, height: 500});
    });
    it('is 640x500 when medium', function () {
        board.setSize('medium');
        expect(board.getSize()).toEqual({width: 640, height: 500});
    });
    it('is 960x500 when huge', function () {
        board.setSize('huge');
        expect(board.getSize()).toEqual({width: 960, height: 500});
    });
    it('is 320x500 when small', function () {
        board.setSize('small');
        expect(board.getSize()).toEqual({width: 320, height: 500});
    });
    it('can position platforms within its boundary', function () {
        var platform = new Platform();
        var original = platform.getLocation();
        board.distributePlatforms([platform]);
        var position = platform.getLocation();
        var size = platform.getSize();
        expect(position).toNotBe(original);
        expect(position.x).toBeLessThan(board.getSize().width - size.width);
        expect(position.y).toBeLessThan(board.getSize().height - size.height);
    })
});
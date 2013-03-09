describe("Board drawing", function () {
    var context = new ContextMock();
    var canvas = {};
    var board = new Board();
    beforeEach(function () {
        spyOn(context, 'beginPath');
        spyOn(context, 'rect');
        spyOn(context, 'closePath');
        spyOn(context,'fill');
        board.draw(canvas, context);
    });
    it('sets the canvas size', function () {
        expect(canvas.width).toEqual(board.width);
        expect(canvas.height).toEqual(board.height);
    });
    it('begins drawing a path', function () {
        expect(context.beginPath).toHaveBeenCalled();
    });
    it('draws a rectangle', function () {
        expect(context.rect).toHaveBeenCalledWith(0, 0, board.width, board.height);
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
        expect(board.width).toEqual(320);
        expect(board.height).toEqual(500);
    });
    it('is 640x500 when medium', function(){
        board.setSize('medium');
        expect(board.width).toEqual(640);
        expect(board.height).toEqual(500);
    })    ;
    it('is 960x500 when huge', function(){
        board.setSize('huge');
        expect(board.width).toEqual(960);
        expect(board.height).toEqual(500);
    })                                    ;
    it('is 320x500 when small', function(){
        board.setSize('small');
        expect(board.width).toEqual(320);
        expect(board.height).toEqual(500);
    })
});
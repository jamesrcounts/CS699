/*
 As a designer
 I want to draw the board
 So that I can see it.
 */
describe("Draw the board", function () {
    it("should draw itself on the context", function () {
        var mock = new ContextMock();
        var board = new Board();
        board.draw(mock);
        expect(mock.beginPathCalls).toEqual(1);
        expect(mock.rectArgs).toEqual([0, 0, board.width, board.height]);
        expect(mock.closePathCalls).toEqual(1);
        expect(mock.fillStyle).toEqual(board.getColor());
        expect(mock.fillCalls).toEqual(1);
    })
});

/*
 As a designer
 I want the board to be colored
 So that I can see it.
 */
describe("See the board", function () {
    it("should be blue", function () {
        var board = new Board();

        expect(board.getColor()).toEqual('#d0e7f9');
    })
});

/*
 As a designer
 I want to resize the board
 So that I can experiment with gameplay
 */
describe("Leave the board the default size", function () {
    it("should be 320x500", function () {
        var board = new Board();
        expect(board.width).toEqual(320);
        expect(board.height).toEqual(500);
    });
});

describe("Increase board size to medium", function () {
    it("should be 640x500", function () {
        var board = new Board();
        board.setSize('medium');
        expect(board.width).toEqual(640);
        expect(board.height).toEqual(500);
    })
});

describe("Increase board size to huge", function () {
    it("should be 960x500", function () {
        var board = new Board();
        board.setSize('huge');
        expect(board.width).toEqual(960);
        expect(board.height).toEqual(500);
    })
});

describe("Make the board small again", function () {
    it("should be 320x500", function () {
        var board = new Board();
        board.setSize('huge');
        board.setSize('small');
        expect(board.width).toEqual(320);
        expect(board.height).toEqual(500);
    })
});
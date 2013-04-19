var sth = (function () {
    var board, debugBoard;

    return {
        Board: function (canvas) {
            if (!canvas) {
                throw new Error("You must initialize a Board with a Canvas reference");
            }

            var defaultWidth = 320
                , defaultHeight = 500
            ;

            canvas.width = defaultWidth;
            canvas.height = defaultHeight;

            return {
                size: { width: canvas.width, height: canvas.height },
                world: new box2d.World() 
            };
        },
        initialize: function () {
            board = new Board().initialize();
            debugBoard = new DebugBoard(board).initialize();
        }
    }
})()
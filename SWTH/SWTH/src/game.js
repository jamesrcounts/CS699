
var sth = (function () {
    var board;

    function animate() {
        window.setInterval(update, 1000 / 60);
    }

    function update() {
        board.update();
    }

    ;

    return {
        Board: window.BoardClass,
        Cloud: window.CloudClass,
        Platform: window.PlatformClass,
        Player: window.PlayerClass,
        boardSize: function (size) {
            if (board)
                board.size(size || "small");
        },
        setControllerPosition: function (x, y) {
            board.setControlPoint(x, y);
        },
        initialize: function (canvas) {
            board = new this.Board(canvas);

            var player = new this.Player(
                30,
                {
                    x: board.size().width / 2,
                    y: board.size().height / 2
                });


            //board.addClouds(10);
            //board.addGamePiece(leftWall);
            //board.addPlatforms(1);
            //board.addGamePiece(player);
            //board.addGround(board.size().width);

            // add clouds here
            board.debugWith(canvas.getContext("2d"));


            animate();
        }
    };
})();

function init() {
    sth.initialize(document.getElementById("canvas"));
}

function update() {
    sth.boardSize('huge');
}

document.onmousemove = function (e) {
    sth.setControllerPosition(e.pageX, e.pageY);
};
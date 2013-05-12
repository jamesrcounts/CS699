
var sth = (function () {
    var board;

    function animate() {
        window.setInterval(update, 1000 / 60);
    }

    function update() {
        board.update();
    };

    return {
        Board: window.BoardClass,
        Platform: window.PlatformClass,
        Player: window.PlayerClass,
        boardSize: function (size) {
            board.size(size);
        }
        , setControllerPosition: function (x, y) {
            board.setControlPoint(x, y);
        }
        , initialize: function (canvas) {
            board = new this.Board(canvas);

            var platform = new this.Platform(
                30,
                { x: board.size().width / 2, y: board.size().height / 2 },
                { horizontal: 35, vertical: 10 });

            var player = new this.Player(
                30,
                { x: board.size().width / 2, y: 0 });

            board.addGamePiece(platform);
            board.addGamePiece(player);
            //board.debugWith(canvas.getContext("2d"));

            platform.pushHorizontal(5);

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
}
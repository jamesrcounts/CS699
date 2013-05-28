
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

            //var ground = new box2d.BodyDefinition();
            //ground.position.x = board.size().width / 60;
            //ground.position.y = board.size() / 30;

            //var box = new box2d.Shape.Polygon();
            //box.SetAsBox()
            
            // simple function to draw a box
            //public function draw_box(px,py,w,h,d,ud):void {
            //    my_box.SetAsBox(w/2/world_scale, h/2/world_scale);
            //    var my_fixture:b2FixtureDef = new b2FixtureDef();
            //    my_fixture.shape=my_box;
            //    var world_body:b2Body=world.CreateBody(my_body);
            //    world_body.SetUserData(ud);
            //    world_body.CreateFixture(my_fixture);
            //}

            board.addClouds(10);
            //board.addGamePiece(leftWall);
            board.addPlatforms(7);
            board.addGamePiece(player);
            board.addGround(board.size().width);

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
var PlayerClass = function (scale, position) {
    function spriteSheet(size) {
        var sheet = new createjs.SpriteSheet({
            images: ["angel.png"],
            frames: {
                width: size.width,
                height: size.height,
                regX: size.width / 2,
                regY: size.height / 2
            },
            animations: { flap: [0, 1, "flap"] }
        });
        return sheet;
    }

    function animation(sprite, pos) {
        var shape = new createjs.BitmapAnimation(sprite);
        shape.gotoAndPlay("flap");
        shape.name = "player";
        shape.direction = 90;
        shape.vX = .5;
        shape.x = pos.x;
        shape.y = pos.y;
        shape.currentFrame = 0;
        return shape;
    }

    var p = {
        extent: { horizontal: 65 / 2, vertical: 95 / 2 }
        , location: position
        , scale: scale
        , update: function () {
            this.location.x = this.body.GetWorldCenter().x * this.scale;
            this.location.y = this.body.GetWorldCenter().y * this.scale;
            this.displayObject.x = this.location.x;
            this.displayObject.y = this.location.y;
        }
    };
    p.bodyDef = gamePiece.bodyDef(scale, box2d.Body.Dynamic, p.location);
    p.fixDef = gamePiece.fixDef(scale, p.extent);
    p.displayObject = animation(
        spriteSheet({ width: 65, height: 95 }),
        position);
    return p;
};

var sth = (function () {
    var board;

    function animate() {
        window.setInterval(update, 1000 / 60);
    }

    function update() {
        board.update();
    };

    return {
        Board: window.BoardClass
        , Platform: window.PlatformClass
        , Player: window.PlayerClass
      , boardSize: function (size) {
          board.size(size);
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

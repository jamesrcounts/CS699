var sth = (function () {
    var board;

    function animate() {
        window.setInterval(update, 1000 / 60);
    }

    function update() {
        board.update();
    };

    return {
        Board: function (canvas) {
            canvas.width = 320;
            canvas.height = 500;
            return {
                addGamePiece: function (piece) {
                    this.world.CreateBody(piece.bodyDef).CreateFixture(piece.fixDef);
                }
              , debugWith: function (context) {
                  var debugDraw = new box2d.DebugDraw();
                  debugDraw.SetSprite(context);
                  debugDraw.SetDrawScale(30.0);
                  debugDraw.SetFillAlpha(0.3);
                  debugDraw.SetLineThickness(1.0);
                  debugDraw.SetFlags(box2d.Debug.Shape | box2d.Debug.Joint);
                  board.world.SetDebugDraw(debugDraw);
              }
              , size: { width: canvas.width, height: canvas.height }
              , update: function () {
                  this.world.Step(1 / 60, 10, 10);
                  this.world.DrawDebugData();
                  this.world.ClearForces();

              }
              , world: new box2d.World(new box2d.Vector(0, 10), true)
            };
        }
      , Platform: function (scale, location, extent) {
          function bodyDef(pos) {
              var def = new box2d.BodyDefinition();
              def.type = box2d.Body.Static;
              def.position.x = pos.x / scale;
              def.position.y = pos.y / scale;
              return def;
          }
          function fixDef(ext) {
              var def = new box2d.FixtureDefinition();
              def.density = 1.0;
              def.friction = 0.5;
              def.restitution = 1;
              def.shape = new box2d.Shape.Polygon();
              def.shape.SetAsBox(ext.horizontal, ext.vertical);
              return def;
          }

          return {
              extent: extent,
              location: location,
              bodyDef: bodyDef(location),
              fixDef: fixDef(extent)
          };
      }
      , initialize: function (canvas) {
          board = new this.Board(canvas);

          var platform = new this.Platform(
              30,
              { x: board.size.width / 2, y: board.size.height / 2 },
              { horizontal: Math.random() + 0.1, vertical: Math.random() + 0.1 });

          board.addGamePiece(platform);
          board.debugWith(canvas.getContext("2d"));
          animate();
      }
    };
})();

function init() {
    sth.initialize(document.getElementById("canvas"));
}

////    return {
////        Board: function (canvas) {
////            if (!canvas) {
////                throw new Error("You must initialize a Board with a Canvas reference");
////            }

////            return {
////                compareToX: function (point) {
////                    if (point.x < 0) {
////                        return -1;
////                    }
////                    if (point.x > canvas.width) {
////                        return 1;
////                    }
////                    return 0;
////                },
////        Platform: function (scale, location, extent) {
////            return {
////                size: {
////                    width: extent.horizontal * 2,
////                    height: extent.vertical * 2
////                },
////                origin: {
////                    x: location.x - extent.horizontal,
////                    y: location.y - extent.vertical
////                },
////                terminal: {
////                    x: location.x + extent.horizontal,
////                    y: location.y + extent.vertical
////                },
////            }
////        },
////        initialize: function (canvas) {
//};

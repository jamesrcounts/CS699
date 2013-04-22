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
            var pieces = [];
            return {
                addGamePiece: function (piece) {
                    var body = this.world.CreateBody(piece.bodyDef);
                    body.CreateFixture(piece.fixDef);
                    piece.body = body;
                    pieces.push(piece);
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
              , outOfBounds: function (c) {
                  if (c < 0) {
                      return true;
                  }
                  if (c > canvas.width) {
                      return true;
                  }
                  return false;
              }
              , size: { width: canvas.width, height: canvas.height }
              , update: function () {
                  this.world.Step(1 / 60, 10, 10);
                  this.world.DrawDebugData();
                  this.world.ClearForces();
                  for (var i = 0; i < pieces.length; i++) {
                      pieces[i].update(this);
                  }
              }
              , world: new box2d.World(new box2d.Vector(0, 0), true)
            };
        }
      , Platform: function (scale, location, extent) {
          function bodyDef(s, pos) {
              var def = new box2d.BodyDefinition();
              def.type = box2d.Body.Dynamic;
              def.position.x = pos.x / s;
              def.position.y = pos.y / s;
              return def;
          }
          function fixDef(s, ext) {
              var def = new box2d.FixtureDefinition();
              def.density = 1.0;
              def.friction = 0.5;
              def.restitution = 1;
              def.shape = new box2d.Shape.Polygon();
              def.shape.SetAsBox(ext.horizontal / s, ext.vertical / s);
              return def;
          }

          var horizontalForce;

          return {
              extent: extent,
              location: location,
              scale: scale,
              bodyDef: bodyDef(scale, location),
              fixDef: fixDef(scale, extent),
              origin: function () {
                  return {
                      x: this.location.x - this.extent.horizontal,
                      y: this.location.y - this.extent.vertical
                  };
              },
              pushHorizontal: function (force) {
                  horizontalForce = force;
                  this.body.ApplyForce(new box2d.Vector(force, 0), this.body.GetPosition());
              },
              terminal: function () {
                  return {
                      x: this.location.x + this.extent.horizontal,
                      y: this.location.y + this.extent.vertical
                  };
              }
              , update: function (parent) {
                  this.location.x = this.body.GetWorldCenter().x * this.scale;
                  this.location.y = this.body.GetWorldCenter().y * this.scale;
                  if (parent.outOfBounds(this.origin().x) || parent.outOfBounds(this.terminal().x)) {
                      horizontalForce = horizontalForce * -1;
                      this.body.ApplyForce(new box2d.Vector(horizontalForce * 2, 0), this.body.GetPosition());
                  }
              }
          };
      }
      , initialize: function (canvas) {
          board = new this.Board(canvas);

          var platform = new this.Platform(
              30,
              { x: board.size.width / 2, y: board.size.height / 2 },
              { horizontal: 35, vertical: 10 });

          board.addGamePiece(platform);
          board.debugWith(canvas.getContext("2d"));

          platform.pushHorizontal(100);

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

////        Platform: function (scale, location, extent) {
////            return {
////                size: {
////                    width: extent.horizontal * 2,
////                    height: extent.vertical * 2
////                },
////            }
////        },
////        initialize: function (canvas) {
//};

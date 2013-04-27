var BoardClass = function (canvas) {
    var sizeIsHuge = /huge/i;
    var defaultWidth = 320;
    canvas.width = defaultWidth;
    canvas.height = 500;
    var pieces = [];
    var instance = {
        addGamePiece: function (piece) {
            var body = this.world.CreateBody(piece.bodyDef);
            body.CreateFixture(piece.fixDef);
            piece.body = body;

            this.stage.addChild(piece.displayObject);

            pieces.push(piece);
        }
      , canvas: canvas
      , color: '#d0e7f9'
      , debugWith: function (context) {
          this.debugging = true;
          
          var debugDraw = new box2d.DebugDraw();
          debugDraw.SetSprite(context);
          debugDraw.SetDrawScale(30.0);
          debugDraw.SetFillAlpha(0.3);
          debugDraw.SetLineThickness(1.0);
          debugDraw.SetFlags(box2d.Debug.Shape | box2d.Debug.Joint);
          this.world.SetDebugDraw(debugDraw);
      }
      , outOfBounds: function (c) {
          if (c < 0) {
              return true;
          }
          if (c > this.canvas.width) {
              return true;
          }
          return false;
      }
      , size: function (boardSize) {
          if (sizeIsHuge.test(boardSize)) {
              this.canvas.width = defaultWidth * 3;
          }
          return {
              width: this.canvas.width, height: this.canvas.height
          };
      }
      , stage: new createjs.Stage(canvas)
      , sprite: new createjs.Shape()
      , update: function () {
          this.world.Step(1 / 60, 10, 10);
          this.world.DrawDebugData();
          this.world.ClearForces();
          if(!this.debugging) {
              this.stage.update();
          }
          this.backgroundUpdate();
          for (var i = 0; i < pieces.length; i++) {
              pieces[i].update(this);
          }
      }
      , backgroundUpdate: function () {
          this.sprite.graphics
          .clear()
              .beginFill(this.color)
              .drawRect(0, 0, this.size().width, this.size().height);
      }
      , world: new box2d.World(new box2d.Vector(0, 10), true)
    };
    instance.stage.addChild(instance.sprite);
    return instance;
};

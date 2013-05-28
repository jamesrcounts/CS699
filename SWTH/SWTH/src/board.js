var BoardClass = function (canvas) {
    var sizeIsHuge = /huge/i;
    var sizeIsMedium = /medium/i;
    var sizeIsSmall = /small/i;

    var defaultWidth = 320;
    canvas.width = defaultWidth;
    canvas.height = 500;
    var backgroundPieces = [];
    var pieces = [];
    var instance = {

        canvas: canvas,
        color: '#d0e7f9',
        controlPoint: { x: 0, y: 0 },

        addPiece: function (piece, layer, collection) {
            var body = layer.CreateBody(piece.bodyDef);
            body.CreateFixture(piece.fixDef);
            piece.body = body;

            this.stage.addChild(piece.displayObject);

            collection.push(piece);
        },

        addBackgroundPiece: function (piece) {
            this.addPiece(piece, this.background, backgroundPieces);
        },

        addClouds: function (count) {
            for (var i = 0; i < count; i++) {
                var c = new sth.Cloud(
                    30,
                    Math.random() * 100,
                    Math.random() / 2, {
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height
                    });
                this.addBackgroundPiece(c);

            }
        },

        addPlatforms: function (count) {
            var step = canvas.height / count;
            var currentStep = 0;
            for (var i = 0; i < count; i++) {
                var p = new sth.Platform(
                    30,
                    {
                        x: Math.random() * canvas.width,
                        y: currentStep
                    },
                    {
                        horizontal: 35,
                        vertical: 10
                    });
                this.addGamePiece(p);
                //p.pushHorizontal(5);
                currentStep += step;
            }
        },

        addGamePiece: function (piece) {
            this.addPiece(piece, this.world, pieces);
        },

        addGround: function (width) {
            if (this.ground) {
                var x = pieces.indexOf(this.ground);
                pieces.splice(x, 1);
                this.world.DestroyBody(this.ground.body);
            }

            this.ground = new sth.Platform(
                30, {
                    y: canvas.height,
                    x: width / 2
                }, {
                    horizontal: width / 2,
                    vertical: 1
                });
            this.addGamePiece(this.ground);
        },
        
        debugWith: function (context) {
            this.debugging = true;

            var debugDraw = new box2d.DebugDraw();
            debugDraw.SetSprite(context);
            debugDraw.SetDrawScale(30.0);
            debugDraw.SetFillAlpha(0.3);
            debugDraw.SetLineThickness(1.0);
            debugDraw.SetFlags(box2d.Debug.Shape | box2d.Debug.Joint);
            this.world.SetDebugDraw(debugDraw);
        },

        outOfBounds: function (x, y) {
            if (x < 0) {
                return true;
            }
            if (x > this.canvas.width) {
                return true;
            }

            if (y < 0) {
                return true;
            }
            if (y > this.canvas.height) {
                return true;
            }
            return false;
        },

        size: function (boardSize) {
            if (sizeIsHuge.test(boardSize)) {
                this.canvas.width = defaultWidth * 3;
            } else if (sizeIsMedium.test(boardSize)) {
                this.canvas.width = defaultWidth * 2;
            } else if (sizeIsSmall.test(boardSize)) {
                this.canvas.width = defaultWidth;
            }

//            this.addGround(canvas.width);
            
            return {
                width: this.canvas.width,
                height: this.canvas.height
            };
        },

        setControlPoint: function (pageX, pageY) {
            var x = pageX - canvas.offsetLeft;
            var y = pageY - canvas.offsetLeft;
            this.controlPoint.x = Math.min(Math.max(0, x), canvas.width);
            this.controlPoint.y = Math.min(Math.max(0, y), canvas.height);
        },
        stage: new createjs.Stage(canvas),
        sprite: new createjs.Shape(),
        updateLayer: function (layer) {
            layer.Step(1 / 60, 10, 10);
            layer.DrawDebugData();
            layer.ClearForces();
        },
        update: function () {
            this.updateLayer(this.background);
            this.updateLayer(this.world);

            if (!this.debugging) {
                this.stage.update();
            }
            this.backgroundUpdate();
            for (var j = 0; j < backgroundPieces.length; j++) {
                backgroundPieces[j].update(this);
            }
            for (var i = 0; i < pieces.length; i++) {
                pieces[i].update(this);
            }
        },
        backgroundUpdate: function () {
            this.sprite.graphics
                .clear()
                .beginFill(this.color)
                .drawRect(0, 0, this.size().width, this.size().height);
        },
        world: new box2d.World(new box2d.Vector(0, 10), true)
        , background: new box2d.World(new box2d.Vector(0, .1), true)
    };
    instance.stage.addChild(instance.sprite);

    var collisionless = new box2d.ContactListener();
    collisionless.PreSolve = function (contact, impulse) {
        contact.SetEnabled(false);
    };
    instance.background.SetContactListener(collisionless);

    return instance;
};
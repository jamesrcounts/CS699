/* Now I want easeljs to draw the platform */

var CANVAS_WIDTH = 300;
var CANVAS_HEIGHT = 300;

var easel = document.getElementById("e");
easel.width = CANVAS_WIDTH;
easel.height = CANVAS_HEIGHT;

var canvas = document.getElementById("c");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

var context2d = canvas.getContext("2d");

// our world is 10m x 10m because the canvas is 300px by 300px
var SCALE = 30;

// Converters
function toScale(dimension) {
    return dimension / SCALE;
}

function toSpan(dimension) {
    return toScale(dimension) / 2;
}

var b2Vec2 = Box2D.Common.Math.b2Vec2
    , b2BodyDef = Box2D.Dynamics.b2BodyDef
    , b2Body = Box2D.Dynamics.b2Body
    , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
    , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
    , b2World = Box2D.Dynamics.b2World
    , b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

// Start with a world
var world = new b2World(new b2Vec2(0, 10), true);

world.AddBox = function (pX, pY, dW, dH, bT) {
    var fixDef = new b2FixtureDef();
    fixDef.density = 1.0;
    fixDef.friction = 0.5;
    fixDef.restitution = 1; // increased bounce
    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(toSpan(dW), toSpan(dH));
    var bodyDef = new b2BodyDef(); bodyDef.type = bT;
    bodyDef.position.x = pX;
    bodyDef.position.y = pY;
    var box = this.CreateBody(bodyDef);
    box.CreateFixture(fixDef);
    return box;
};

// Distinguish body type by name
world.AddStaticBox = function (pX, pY, dW, dH) {
    return this.AddBox(pX, pY, dW, dH, b2Body.b2_staticBody);
};

world.AddDynamicBox = function (pX, pY, dW, dH) {
    return this.AddBox(pX, pY, dW, dH, b2Body.b2_dynamicBody);
};

var Platform = function (cX, cY, dW, dH, st) {

    var self = this;

    self.shape = new createjs.Shape();
    st.addChild(self.shape);
    self.centerX = cX;
    self.centerY = cY;
    self.width = dW;
    self.height = dH;
    self.horizontalSpan = dW / 2;
    self.verticalSpan = dH / 2;

    return {
        deflection: 0,
        center: function () {
            return {
                x: self.centerX,
                y: self.centerY
            }
        },
        control: function () {
            return {
                x: this.center().x,
                y: this.center().y + this.deflection
            }
        },
        dimensions: function () {
            return {
                w: self.width,
                h: self.height
            }
        },
        end: function () {
            return {
                x: self.centerX + self.horizontalSpan,
                y: self.centerY + self.verticalSpan
            }
        },
        start: function () {
            return {
                x: self.centerX - self.horizontalSpan,
                y: self.centerY - self.verticalSpan,
            }
        },
        render: function () {
            self.shape.graphics
                .clear()
                .setStrokeStyle(this.dimensions().h)
                .beginStroke("red")
                .moveTo(this.start().x, this.center().y)
                .curveTo(this.control().x, this.control().y, this.end().x, this.center().y);
        }
    }
};

var AngelSprite = function () {
    return new createjs.SpriteSheet({
        images: ["angel.png"],
        frames: { width: 65, height: 95, regX: 32.5, regY: 47.5 },
        animations: { flap: [0, 1, "flap"] }
    });
};

var AngelAnimation = function (sprite) {
    var angel = new createjs.BitmapAnimation(sprite);
    angel.gotoAndPlay("flap");
    angel.name = "angel";
    angel.direction = 90;
    angel.vX = .5;
    angel.x = CANVAS_WIDTH/2;
    angel.y = 10;
    angel.currentFrame = 0;
    return angel;
}

var stage = new createjs.Stage("e");
p = new Platform(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 70, 10, stage);
var sp = new AngelSprite();
var aa = new AngelAnimation(sp);
stage.addChild(aa);

// Add platform
world.AddStaticBox(
    toScale(p.center().x),
    toScale(p.center().y),
    p.dimensions().w,
    p.dimensions().h);

// Add angel
var angelBox = world.AddDynamicBox(
    toScale(CANVAS_WIDTH) / 2,
    toScale(10),
    65,
    95);

// Display debug info
var debugDraw = new b2DebugDraw();
debugDraw.SetSprite(context2d);
debugDraw.SetDrawScale(SCALE);
debugDraw.SetFillAlpha(0.3);
debugDraw.SetLineThickness(1.0);
debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
world.SetDebugDraw(debugDraw);
world.DrawDebugData();

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// Define how to move the simulation forward
var frameRate = 1 / 60; // 60Hz
var velocityIterations = 10; // compute forces over the next 10 frames
var positionIterations = 10; // compute positions over the next 10 frames


function handleTick() {
    aa.x = angelBox.GetWorldCenter().x * SCALE;
    aa.y = angelBox.GetWorldCenter().y * SCALE;
    world.DrawDebugData();
    p.render();
    stage.update();
    world.Step(frameRate, velocityIterations, positionIterations);
    world.ClearForces();
}

createjs.Ticker.addEventListener("tick", handleTick);

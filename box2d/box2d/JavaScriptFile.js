/* Now I want easeljs to draw the platform */

var CANVAS_WIDTH = 300;
var CANVAS_HEIGHT = 300;

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
    world.CreateBody(bodyDef).CreateFixture(fixDef);
};

// Distinguish body type by name
world.AddStaticBox = function (pX, pY, dW, dH) {
    this.AddBox(pX, pY, dW, dH, b2Body.b2_staticBody);
};

world.AddDynamicBox = function (pX, pY, dW, dH) {
    this.AddBox(pX, pY, dW, dH, b2Body.b2_dynamicBody);
};

var Platform = function (cX, cY, dW, dH) {
    var self = this;
    self.shape = new createjs.Shape();
    self.centerX = cX;
    self.centerY = cY;
    self.width = dW;
    self.height = dH;

    return {
        center: function () {
            return {
                x: self.centerX,
                y: self.centerY
            }
        },
        dimensions: function () {
            return {
                w: self.width,
                h: self.height
            }
        }
    }

    //var toPixelSpan = function (dim) {
    //    return dim / 2;
    //};

    //return {
    //    deflection: 0,
    //    start: function () {
    //        return {
    //            x: self.centerX - toPixelSpan(self.width),
    //            y: self.centerY - toPixelSpan(self.height)
    //        };
    //    },
    //    center: function () {
    //        return {
    //            x: self.centerX,
    //            y: self.centerY,
    //        };
    //    },
    //    control: function () {
    //        return {
    //            x: self.centerX,
    //            y: self.centerY + this.deflection
    //        };
    //    },
    //    end: function () {
    //        return {
    //            x: self.centerX + toPixelSpan(width),
    //            y: self.centerY + toPixelSpan(height)
    //        };
    //    },
    //    dimensions: function () {
    //        return {
    //            w: self.width,
    //            h: self.height
    //        };
    //    },
    //    render: function () {
    //        shape.graphics
    //            .clear()
    //            .setStrokeStyle(this.height)
    //            .beginStroke("red")
    //            .moveTo(this.x, this.y)
    //            .curveTo(platform.control().x, platform.control().y, platform.end().x, platform.end().y);
    //    }
    //};
};

p = new Platform(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 70, 10);

// Add platform
world.AddStaticBox(
    toScale(p.center().x),
    toScale(p.center().y),
    p.dimensions().w,
    p.dimensions().h);

// Add angel
// Add angel
world.AddDynamicBox(toScale(CANVAS_WIDTH) / 2, toScale(10), 65, 95);
// Display debug info
// Display debug info
var debugDraw = new b2DebugDraw();
debugDraw.SetSprite(context2d);
debugDraw.SetDrawScale(SCALE);
debugDraw.SetFillAlpha(0.3);
debugDraw.SetLineThickness(1.0);
debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
world.SetDebugDraw(debugDraw);
world.DrawDebugData();
/* Now I want to animate */
/* Now I want to animate */window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback /* DOMElement */, element) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
// Define how to move the simulation forward
// Define how to move the simulation forward
var frameRate = 1 / 60; // 60Hz
// 60Hz
var velocityIterations = 10; // compute forces over the next 10 frames
// compute forces over the next 10 frames
var positionIterations = 10; // compute positions over the next 10 frames
// compute positions over the next 10 frames
function update() {
    world.Step(frameRate, velocityIterations, positionIterations);
    world.DrawDebugData();
    world.ClearForces(); //???
    requestAnimFrame(update); // run again
}
;
// kick off
// kick off
requestAnimFrame(update);

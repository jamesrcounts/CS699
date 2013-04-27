﻿var gamePiece = {
    bodyDef: function (scale, type, position) {
        var def = new box2d.BodyDefinition();
        def.type = type;
        def.position.x = position.x / scale;
        def.position.y = position.y / scale;
        return def;
    },
    fixDef: function (scale, extent) {
        var def = new box2d.FixtureDefinition();
        def.density = 1.0;
        def.friction = 0.5;
        def.restitution = 1;
        def.shape = new box2d.Shape.Polygon();
        def.shape.SetAsBox(extent.horizontal / scale, extent.vertical / scale);
        return def;
    }
};

var PlatformClass = function (scale, location, extent) {
    var horizontalForce;

    return {
        extent: extent,
        location: location,
        scale: scale,
        bodyDef: gamePiece.bodyDef(scale, box2d.Body.Kinematic, location),
        fixDef: gamePiece.fixDef(scale, extent),
        origin: function () {
            return {
                x: this.location.x - this.extent.horizontal,
                y: this.location.y - this.extent.vertical
            };
        },
        pushHorizontal: function (force) {
            horizontalForce = force;
            this.body.SetLinearVelocity(new box2d.Vector(force, 0));
        }
        , size: function () {
            return {
                width: this.extent.horizontal * 2,
                height: this.extent.vertical * 2
            };
        }
        , terminal: function () {
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
                this.body.SetLinearVelocity(new box2d.Vector(horizontalForce, 0));
            }

            this.sprite.graphics
                .clear()
                .setStrokeStyle(this.size().height)
                .beginStroke("red")
                .moveTo(this.origin().x, this.location.y)
                .curveTo(this.location.x, this.location.y, this.terminal().x, this.location.y);
        }
    };
};

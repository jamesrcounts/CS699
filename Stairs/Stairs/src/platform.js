"use strict";

function createPlatform(spec, center) {
    var platform = Object.create(piece);
    platform.pieceType = "platform";
    platform.scale = spec.scale;
    platform.width = 70;
    platform.height = 20;
    platform.fill = ['#FF8C00', '#EEEE00'];
    platform.isPhysical = true;
    platform.position(center);
    platform.bodyDefinition = new box2d.BodyDefinition();
    platform.bodyDefinition.position.x = platform.center.x / platform.scale;
    platform.bodyDefinition.position.y = platform.center.y / platform.scale;
    platform.bodyDefinition.type = box2d.Body.Kinematic;

    platform.bodyExtent = function () {
        return {
            width: this.width / (2 * platform.scale),
            height: this.height / (2 * platform.scale)
        };
    };

    platform.fixtureDefinition = new box2d.FixtureDefinition();
    platform.fixtureDefinition.shape = new box2d.Shape.Polygon();
    platform.fixtureDefinition.shape.SetAsBox(
        platform.bodyExtent().width,
        platform.bodyExtent().height);
    platform.fixtureDefinition.isSensor = true;

    platform.origin = function () {
        return {
            x: this.x,
            y: this.y
        };
    };

    platform.terminal = function () {
        return {
            x: this.origin().x + this.width,
            y: this.origin().y + this.height
        };
    };

    platform.draw = function () {

        this.position({
            x: this.x + (this.width / 2),
            y: this.y + (this.height / 2)
        });

        this.displayObject
            .graphics
            .clear()
            .setStrokeStyle(this.height)
            .beginRadialGradientStroke(
                platform.fill, [0, 1],
                center.x, center.y, 5,
                center.x, center.y, 45)
            .moveTo(this.origin().x, center.y)
            .curveTo(
                center.x, center.y,
                this.terminal().x, center.y);
    };

    platform.update = platform.draw;

    platform.onContact = function (other) {
        var vy = (this.body.GetWorldCenter().y ) -
            (other.body.GetWorldCenter().y );

        if (0 < vy) {
            other.body
                .SetLinearVelocity(
                new box2d.Vector(0, -10),
                other.body.GetWorldCenter());
        }
    }

    return platform.init();
}

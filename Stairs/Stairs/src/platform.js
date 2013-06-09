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

    platform.fixtureDefinition = new box2d.FixtureDefinition();
    //platform.fixtureDefinition.density = 1;
    //platform.fixtureDefinition.friction = 0.5;
    //platform.fixtureDefinition.restitution = 1.5;
    platform.fixtureDefinition.shape = new box2d.Shape.Polygon();
    platform.fixtureDefinition.shape.SetAsBox(
        platform.width / (2 * platform.scale),
        platform.height / (2 * platform.scale));
    platform.fixtureDefinition.isSensor = true;

    //platform.collideWith = function (player) {
    //    player.canJump = true;
    //};

    platform.draw = function () {
        var origin = {
            x: this.x,
            y: this.y
        };

        var terminal = {
            x: origin.x + this.width,
            y: origin.y + this.height
        };

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
            .moveTo(origin.x, center.y)
            .curveTo(
                center.x, center.y,
                terminal.x, center.y);
    };

    platform.update = platform.draw;

    platform.onContact = function (other) {
        other.body
            .SetLinearVelocity(
            new box2d.Vector(0, -10),
            other.body.GetWorldCenter());
    }

    return platform.init();
}

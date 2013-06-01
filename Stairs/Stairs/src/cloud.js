"use strict";

function createCloud(spec) {
    var cloud = Object.create(piece);
    cloud.scale = spec.scale;
    cloud.isPhysical = true;
    cloud.fill = 'rgba(255, 255, 255, ' + Math.random() / 2 + ')';
    cloud.x = Math.random() * spec.width;
    cloud.y = Math.random() * spec.height;
    cloud.r = Math.random() * 100;

    cloud.bodyDefinition = new box2d.BodyDefinition();
    cloud.bodyDefinition.position.x = cloud.x / cloud.scale;
    cloud.bodyDefinition.position.y = cloud.y / cloud.scale;
    cloud.bodyDefinition.type = box2d.Body.Kinematic;

    var shape = new box2d.Shape.Circle(cloud.r / cloud.scale);
    cloud.fixtureDefinition = new box2d.FixtureDefinition();
    cloud.fixtureDefinition.shape = shape;
    cloud.fixtureDefinition.isSensor = true;

    cloud.draw = function () {
        this.displayObject
            .graphics
            .clear()
            .setStrokeStyle(1)
            .beginStroke()
            .beginFill(this.fill)
            .drawCircle(this.x, this.y, this.r);
        return this;
    };

    cloud.update = function (width, height) {
        this.body.SetLinearVelocity(new box2d.Vector(0, 1));
        if (this.outOfBounds(width, height, this.x, this.y)) {
            this.body.SetPosition(new box2d.Vector(
                (Math.random() * width) / this.scale,
                0));
            this.opacity = Math.random() / 2;
            this.radius = Math.random() * 100;
        }

        this.updatePosition();
        this.draw();
        return this;
    };

    return cloud.init();
}

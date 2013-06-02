"use strict";

function createCloud(spec) {
    var cloud = Object.create(piece);
    cloud.scale = spec.scale;
    cloud.isPhysical = true;
    cloud.fill = createjs.Graphics.getRGB(255, 255, 255, Math.random() / 2);
    cloud.x = Math.random() * spec.width;
    cloud.y = Math.random() * spec.height;
    cloud.radius = Math.random() * 100;

    cloud.bodyDefinition = new box2d.BodyDefinition();
    cloud.bodyDefinition.position.x = cloud.x / cloud.scale;
    cloud.bodyDefinition.position.y = cloud.y / cloud.scale;
    cloud.bodyDefinition.type = box2d.Body.Kinematic;

    cloud.fixtureDefinition = new box2d.FixtureDefinition();
    cloud.fixtureDefinition.shape = new box2d.Shape.Circle(cloud.radius / cloud.scale);
    cloud.fixtureDefinition.isSensor = true;

    cloud.draw = function () {
        this.displayObject
            .graphics
            .clear()
            .setStrokeStyle(1)
            .beginStroke()
            .beginFill(this.fill)
            .drawCircle(this.center.x, this.center.y, this.radius);
        return this;
    };

    cloud.update = function (width, height) {
        var position, oob;
        this.body.SetLinearVelocity(new box2d.Vector(0, 1));
        position = this.body.GetPosition();
        oob = this.outOfBounds(
            width,
            height,
            position.x * this.scale,
            position.y * this.scale);
        
        if (oob) {
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

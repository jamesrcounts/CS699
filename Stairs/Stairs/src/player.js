"use strict";

function createPlayer(spec) {
    var player, sprite;
    player = Object.create(piece);
    player.init();
    player.pieceType = "player";
    player.isPhysical = true;
    player.scale = spec.scale;
    player.agility = 2500;
    player.canJump = true;
    player.width = 65;
    player.height = 95;
    player.center = { x: spec.width / 2, y: spec.height / 2 };
    player.x = player.center.x - (player.width / 2);
    player.y = player.center.y - (player.height / 2);

    player.bodyDefinition = new box2d.BodyDefinition();
    player.bodyDefinition.type = box2d.Body.Dynamic;
    player.bodyDefinition.position.x = player.center.x / player.scale;
    player.bodyDefinition.position.y = player.center.y / player.scale;
    player.bodyDefinition.fixedRotation = true;

    player.fixtureDefinition = new box2d.FixtureDefinition();
    player.fixtureDefinition.density = 1.0;
    player.fixtureDefinition.friction = 0.5;
    player.fixtureDefinition.restitution = 1.0;
    player.fixtureDefinition.shape = new box2d.Shape.Polygon();
    player.fixtureDefinition.shape.SetAsBox(
        player.width / (2 * player.scale),
        player.height / (2 * player.scale));

    sprite = new createjs.SpriteSheet({
        images: ["angel.png"],
        frames: {
            width: player.width,
            height: player.height,
            regX: player.width / 2,
            regY: player.height / 2
        },
        animations: { flap: [0, 1, "flap", 8] }
    });

    player.displayObject = new createjs.BitmapAnimation(sprite);
    player.displayObject.gotoAndPlay("flap");
    player.displayObject.name = "player";
    player.displayObject.direction = 90;
    player.displayObject.vX = 0.5;
    player.displayObject.x = player.x;
    player.displayObject.y = player.y;
    player.displayObject.currentFrame = 0;

    player.update = function () {
        this.updatePosition();
        this.displayObject.x = this.center.x;
        this.displayObject.y = this.center.y;
        if (this.jumpNext) {
            this.jumpNext = false;
            this.body.SetLinearVelocity(new box2d.Vector(0, this.agility * -1));
        }
        return this;
    };

    player.move = function (v) {
        var velocity = this.body.GetLinearVelocity();
        if (5000 < Math.abs(velocity.x)) {
            return this;
        }

        this.body.ApplyForce(
            new box2d.Vector(v, 0),
            this.body.GetPosition());
        return this;
    };

    player.moveLeft = function () {
        this.move(this.agility * -1);
        return this;
    };

    player.moveRight = function () {
        this.move(this.agility);
        return this;
    };

    player.jump = function () {
        this.jumpNext = true;
        //var v = this.body.GetLinearVelocity();
        //if (v.y < 0) {
        //    this.body.SetLinearVelocity(new box2d.Vector(0, this.agility));
        //}
        //return this;
    };

    return player;
};

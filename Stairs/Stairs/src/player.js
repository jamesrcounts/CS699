"use strict";

function createPlayer(spec) {
    var player = Object.create(piece);
    player.init();
    player.isPhysical = true;
    player.scale = spec.scale;
    player.agility = 2500;
    player.canJump = true;
    player.width = 65;
    player.height = 95;
    player.x = spec.width / 2;
    player.y = spec.height / 2;

    player.bodyDefinition = new box2d.BodyDefinition();
    player.bodyDefinition.type = box2d.Body.Dynamic;
    player.bodyDefinition.position.x = player.x / player.scale;
    player.bodyDefinition.position.y = player.y / player.scale;

    player.fixtureDefinition = new box2d.FixtureDefinition();
    player.fixtureDefinition.density = 1.0;
    player.fixtureDefinition.friction = 0.5;
    player.fixtureDefinition.restitution = 1.0;
    player.fixtureDefinition.shape = new box2d.Shape.Polygon();
    player.fixtureDefinition.shape.SetAsBox(
        player.width / (2 * player.scale),
        player.height / (2 * player.scale));

    var sprite = new createjs.SpriteSheet({
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
        this.displayObject.x = this.x;
        this.displayObject.y = this.y;
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
        if (this.canJump) {
            this.body.ApplyForce(
                new box2d.Vector(0, this.agility),
                this.body.GetPosition());
            this.canJump = false;
        }
        return this;
    };
    
    return player;
};

var PlayerClass = function(scale, position) {

    function spriteSheet(size) {
        var sheet = new createjs.SpriteSheet({
            images: ["angel.png"],
            frames: {
                width: size.width,
                height: size.height,
                regX: size.width / 2,
                regY: size.height / 2
            },
            animations: { flap: [0, 1, "flap"] }
        });
        return sheet;
    }

    function animation(sprite, pos) {
        var shape = new createjs.BitmapAnimation(sprite);
        shape.gotoAndPlay("flap");
        shape.name = "player";
        shape.direction = 90;
        shape.vX = .5;
        shape.x = pos.x;
        shape.y = pos.y;
        shape.currentFrame = 0;
        return shape;
    }

    function controlDirection(location, controlPoint) {
        if (location.x > controlPoint.x) {
            return -1;
        }

        if (location.x < controlPoint.x) {
            return 1;
        }

        return 0;
    }

    var p = {
        extent: { horizontal: 65 / 2, vertical: 95 / 2 },
        location: position,
        scale: scale,
        update: function(parent) {

            this.location.x = this.body.GetWorldCenter().x * this.scale;
            this.location.y = this.body.GetWorldCenter().y * this.scale;
            this.displayObject.x = this.location.x;
            this.displayObject.y = this.location.y;

            var direction = controlDirection(this.location, parent.controlPoint);
            this.body.ApplyForce(new box2d.Vector(50 * direction, 0), this.body.GetPosition());
        }
    };
    p.bodyDef = gamePiece.bodyDef(scale, box2d.Body.Dynamic, p.location);
    p.fixDef = gamePiece.fixDef(scale, p.extent);
    p.displayObject = animation(
        spriteSheet({ width: 65, height: 95 }),
        position);
    return p;
};
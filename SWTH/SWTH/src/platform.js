var PlatformClass = function(scale, location, extent) {
    var horizontalForce;

    return {
        displayObject: gamePiece.shape(),
        extent: extent,
        location: location,
        scale: scale,
        bodyDef: gamePiece.bodyDef(scale, box2d.Body.Kinematic, location),
        fixDef: gamePiece.fixDef(scale, extent),
        origin: function() {
            return {
                x: this.location.x - this.extent.horizontal,
                y: this.location.y - this.extent.vertical
            };
        },
        pushHorizontal: function(force) {
            horizontalForce = force;
            this.body.SetLinearVelocity(new box2d.Vector(force, 0));
        },
        size: function() {
            return {
                width: this.extent.horizontal * 2,
                height: this.extent.vertical * 2
            };
        },
        terminal: function() {
            return {
                x: this.location.x + this.extent.horizontal,
                y: this.location.y + this.extent.vertical
            };
        },
        update: function(parent) {
            this.location.x = this.body.GetWorldCenter().x * this.scale;
            this.location.y = this.body.GetWorldCenter().y * this.scale;
            if (parent.outOfBounds(this.origin().x) || parent.outOfBounds(this.terminal().x)) {
                horizontalForce = horizontalForce * -1;
                this.body.SetLinearVelocity(new box2d.Vector(horizontalForce, 0));
            }

            this.displayObject.graphics
                .clear()
                .setStrokeStyle(this.size().height)
                .beginStroke("red")
                .moveTo(this.origin().x, this.location.y)
                .curveTo(this.location.x, this.location.y, this.terminal().x, this.location.y);
        }
    };
};
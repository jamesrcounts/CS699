var CloudClass = function (scale, radius, opacity, location) {
    function fixture() {
        var def = new box2d.FixtureDefinition();
        def.density = 0.1;
        def.friction = 0.1;
        def.restitution = 0.1;
        def.shape = new box2d.Shape.Circle(radius);
        return def;
    }

    return {
        displayObject: gamePiece.shape(),
        location: location,
        opacity: opacity,
        radius: radius,
        bodyDef: gamePiece.bodyDef(scale, box2d.Body.Dynamic, location),
        fixDef: fixture(),
        scale: scale,
        update: function (parent) {
            if (parent.outOfBounds(this.location.x, this.location.y)) {
                this.body.SetPosition(new box2d.Vector(
                    (Math.random() * parent.size().width) / scale,
                    (Math.random() * parent.size().height) / scale));
                this.opacity = Math.random() / 2;
                this.radius = Math.random() * 100;
            }
            this.location.x = this.body.GetWorldCenter().x * this.scale;
            this.location.y = this.body.GetWorldCenter().y * this.scale;

            var fill = 'rgba(255,255,255,' + this.opacity + ')';
            this.displayObject.graphics
                .clear()
                .setStrokeStyle(1)
                .beginStroke()
                .beginFill(fill)
                .drawCircle(this.location.x, this.location.y, this.radius);
        }
    };
}
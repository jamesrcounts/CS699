var CloudClass = function (scale, radius, opacity, location) {
    function fixture() {
        var def = new box2d.FixtureDefinition();
        def.density = 0.1;
        def.friction = 0.1;
        def.restitution = 0.1;
        def.shape = new box2d.Shape.Circle();
        def.shape.Set(0, 0);
        def.shape.radius = radius;
        return def;
    }
    
    return {
        location: location,
        opacity: opacity,
        radius: radius,
        bodyDef: gamePiece.bodyDef(scale, box2d.Body.Dynamic, location),
        fixDef: fixture()
    };
}
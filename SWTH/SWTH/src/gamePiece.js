var gamePiece = {
    bodyDef: function(scale, type, position) {
        var def = new box2d.BodyDefinition();
        def.type = type;
        def.position.x = position.x / scale;
        def.position.y = position.y / scale;
        return def;
    },
    fixDef: function(scale, extent) {
        var def = new box2d.FixtureDefinition();
        def.density = 1.0;
        def.friction = 0.5;
        def.restitution = 1;
        def.shape = new box2d.Shape.Polygon();
        def.shape.SetAsBox(extent.horizontal / scale, extent.vertical / scale);
        return def;
    },
    shape: function() {
        return new createjs.Shape();
    }
};
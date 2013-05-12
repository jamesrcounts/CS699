describe("The player", function () {
    var player = new sth.Player(30, { x: 160, y: 250 });
    it("creates a box2D body definition", function () {
        var bodyDef = new box2d.BodyDefinition();
        bodyDef.type = box2d.Body.Dynamic;
        bodyDef.position.x = 160 / 30;
        bodyDef.position.y = 250 / 30;

        expect(player.bodyDef).toEqual(bodyDef);
    });

    it("creates a box2d fixture definition", function () {
        var fixDef = new box2d.FixtureDefinition();
        fixDef.density = 1.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 1;
        fixDef.shape = new box2d.Shape.Polygon();
        fixDef.shape.SetAsBox(65 / 2 / 30, 95 / 2 / 30);
        expect(player.fixDef).toEqual(fixDef);
    });


    it("creates a createjs DisplayObject", function () {
        expect(player.displayObject instanceof createjs.DisplayObject).toBeTruthy();
    });
});

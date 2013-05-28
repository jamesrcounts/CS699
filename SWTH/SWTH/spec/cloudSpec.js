describe("A cloud", function () {
    var location = { x: 10, y: 43 };
    var opacity = .37;
    var radius = 10;
    var cloud = new sth.Cloud(30, radius, opacity, location);
    it("Has a location", function () {
        expect(cloud.location).toEqual(location);
    });
    it("Has a radius", function () {
        expect(cloud.radius).toEqual(radius);
    });
    it("Has transparency", function () {
        expect(cloud.opacity).toEqual(opacity);
    });
    it("Has a box2d body definition", function() {
        var bodyDef = new box2d.BodyDefinition();
        bodyDef.type = box2d.Body.Dynamic;
        bodyDef.position.x = 10 / 30;
        bodyDef.position.y = 43 / 30;

        expect(cloud.bodyDef).toEqual(bodyDef);
    });

    it("Has a box2d fixture definition", function () {
        var fixtureDef = new box2d.FixtureDefinition();
        fixtureDef.density = 0.1;
        fixtureDef.friction = 0.1;
        fixtureDef.restitution = 0.1;
        fixtureDef.shape = new box2d.Shape.Circle(10);
        expect(cloud.fixDef).toEqual(fixtureDef);
    });

    it("Has a createjs DisplayObject", function () {
        expect(cloud.displayObject instanceof createjs.DisplayObject).toBeTruthy();
    });
});

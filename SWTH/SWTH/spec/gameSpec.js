
describe("A platform", function () {
    var extent = { horizontal: 35, vertical: 10 };
    var location = { x: 160, y: 250 };
    var platform = new sth.Platform(30, location, extent);
    it("has a location", function () {
        expect(platform.location).toEqual(location);
    });
    it("has a extent", function () {
        expect(platform.extent).toEqual(extent);
    });
    it("has a size which is twice the extents", function () {
        expect(platform.size).toEqual({ width: 70, height: 20 });
    });
    it("has an origin", function () {
        expect(platform.origin).toEqual({ x: 125, y: 240 });
    });
    it("has a terminal", function () {
        expect(platform.terminal).toEqual({ x: 195, y: 260 });
    });
    it("creates a box2D body definition", function () {
        var bodyDef = new box2d.BodyDefinition();
        bodyDef.type = box2d.Body.Static;
        bodyDef.position.x = 160;
        bodyDef.position.y = 250;

        expect(platform.bodyDef).toEqual(bodyDef);
    });
    it("creates a box2D fixture definition", function () {
        var fixDef = new box2d.FixtureDefinition();
        fixDef.density = 1.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 1;
        fixDef.shape = new box2d.Polygon();
        fixDef.shape.SetAsBox(35 / 30, 10 / 30);
        expect(platform.fixDef).toEqual(fixDef);
    });
});
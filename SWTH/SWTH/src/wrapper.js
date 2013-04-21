/* facade for box2d */
var box2d = (function () {
    return {
        Body: {
            Static: Box2D.Dynamics.b2Body.b2_staticBody,
            Dynamic: Box2D.Dynamics.b2Body.b2_dynamicBody
        },
        BodyDefinition: Box2D.Dynamics.b2BodyDef,
        FixtureDefinition: Box2D.Dynamics.b2FixtureDef,
        Polygon: Box2D.Collision.Shapes.b2PolygonShape,
        Vector: Box2D.Common.Math.b2Vec2,
        World: Box2D.Dynamics.b2World
    }

})();
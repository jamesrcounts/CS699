/* facade for box2d */
var box2d = (function() {
    return {
        Body: {
            Dynamic: Box2D.Dynamics.b2Body.b2_dynamicBody,
            Kinematic: Box2D.Dynamics.b2Body.b2_kinematicBody,
            Static: Box2D.Dynamics.b2Body.b2_staticBody
        },
        BodyDefinition: Box2D.Dynamics.b2BodyDef,
        Debug: {
            Shape: Box2D.Dynamics.b2DebugDraw.e_shapeBit,
            Joint: Box2D.Dynamics.b2DebugDraw.e_jointBit
        },
        DebugDraw: Box2D.Dynamics.b2DebugDraw,
        FixtureDefinition: Box2D.Dynamics.b2FixtureDef,
        Shape: {
            Polygon: Box2D.Collision.Shapes.b2PolygonShape
        },
        Vector: Box2D.Common.Math.b2Vec2,
        World: Box2D.Dynamics.b2World
    };
})();
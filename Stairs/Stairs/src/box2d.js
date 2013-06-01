"use strict";
var box2d = {
    Body: {
        Dynamic: Box2D.Dynamics.b2Body.b2_dynamicBody,
        Kinematic: Box2D.Dynamics.b2Body.b2_kinematicBody,
        Static: Box2D.Dynamics.b2Body.b2_staticBody
    }
    , BodyDefinition: Box2D.Dynamics.b2BodyDef
    , FixtureDefinition: Box2D.Dynamics.b2FixtureDef
    , Vector: Box2D.Common.Math.b2Vec2
    , Shape: {
        Circle: Box2D.Collision.Shapes.b2CircleShape
        , Polygon: Box2D.Collision.Shapes.b2PolygonShape
    }
    , World: Box2D.Dynamics.b2World
};

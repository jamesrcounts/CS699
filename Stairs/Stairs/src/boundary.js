"use strict";

function createBoundary(spec) {
    var boundary = Object.create(piece);
    boundary.isPhysical = true;
    boundary.scale = spec.scale;

    boundary.bodyDefinition = new box2d.BodyDefinition();
    boundary.bodyDefinition.position.x = spec.x / boundary.scale;
    boundary.bodyDefinition.position.y = spec.y / boundary.scale;
    boundary.bodyDefinition.type = box2d.Body.Static;
    boundary.bodyDefinition.density = 1.0;
    boundary.bodyDefinition.friction = 0.5;
    boundary.bodyDefinition.restitution = 1;

    boundary.fixtureDefinition = new box2d.FixtureDefinition();
    boundary.fixtureDefinition.shape = new box2d.Shape.Polygon();
    boundary.fixtureDefinition.shape.SetAsBox(
        spec.width / (2 * boundary.scale),
        spec.height / (2 * boundary.scale));

    return boundary;
}

"use strict";

function createBoundary(spec) {
    var boundary = Object.create(piece);
    boundary.isPhysical = true;
    boundary.scale = spec.scale;
    boundary.id = spec.id;

    boundary.bodyDefinition = new box2d.BodyDefinition();
    boundary.bodyDefinition.position.x = spec.x / boundary.scale;
    boundary.bodyDefinition.position.y = spec.y / boundary.scale;
    boundary.bodyDefinition.type = box2d.Body.Kinematic;

    boundary.fixtureDefinition = new box2d.FixtureDefinition();
    boundary.fixtureDefinition.shape = new box2d.Shape.Polygon();
    boundary.fixtureDefinition.shape.SetAsBox(
        spec.width / (2 * boundary.scale),
        spec.height / (2 * boundary.scale));
    boundary.fixtureDefinition.isSensor = true;

    boundary.onContact = function () { }

    return boundary;
}

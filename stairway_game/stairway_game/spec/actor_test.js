function Actor(body /* box2d body */, renderer /* canvas drawing function */) {
    body.render = renderer;
    return body;
}

describe('An Actor', function () {
    it('Combines a box2D body with a render method', function () {
        var actor = Actor(new Object(), function () { });
        expect(actor.hasOwnProperty('render')).toEqual(true);
    });
});
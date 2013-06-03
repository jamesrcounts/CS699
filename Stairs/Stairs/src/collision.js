"use sctrict";

function createContactListener() {
    var listener = new box2d.ContactListener();
    listener.BeginContact = function (contact) {

        var player = null;

        var alpha = contact.GetFixtureA().GetBody();
        var alphaPiece = alpha.GetUserData();
        if (alphaPiece.isPiece("player")) {
            player = alphaPiece;
        }

        var beta = contact.GetFixtureB().GetBody();
        var betaPiece = beta.GetUserData();
        if (player === null && betaPiece.isPiece("player")) {
            player = betaPiece;
        }

        if (player === null) {
            return;
        }

        var platform = player === alphaPiece ? betaPiece : alphaPiece;
        if (!platform.isPiece("platform")) {
            return;
        }

        var foot = (player.body.GetPosition().y * player.scale) + (player.height / 2);
        var head = (platform.body.GetPosition().y * platform.scale) - (platform.height / 2);
        //if (head < foot) {
        //    contact.SetEnabled(false);
        //}
        if (foot < head) {
            player.jump();
        }

        return;
    };
    return listener;
}

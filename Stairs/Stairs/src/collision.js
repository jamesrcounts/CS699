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

        var other = player === alphaPiece ? betaPiece : alphaPiece;
        other.onContact(player);
    };

    return listener;
}

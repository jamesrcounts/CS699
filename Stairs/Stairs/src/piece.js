"use scrict";

var piece = {
    isPhysical: false
    , init: function () {
        this.displayObject = new createjs.Shape();
        return this;
    }
    , isPiece: function(c) {
        return this.pieceType === c || this.id === c;
    }
    , onContact: function () {
        return this;
    }
    , outOfBounds: function (w, h, x, y) {
        if (x < 0) {
            return true;
        }
        if (x > w) {
            return true;
        }

        if (y < 0) {
            return true;
        }
        if (y > h) {
            return true;
        }
        return false;
    }
    , position: function(center) {
        this.center = center;
        this.x = this.center.x - (this.width / 2);
        this.y = this.center.y - (this.height / 2);
    }
    , updatePosition: function () {
        if (!this.isPhysical) {
            throw "this is not a physical object";
        }
        this.center = {
            x: this.body.GetWorldCenter().x * this.scale,
            y: this.body.GetWorldCenter().y * this.scale
        };
    }
    , update: function () {
    }
};

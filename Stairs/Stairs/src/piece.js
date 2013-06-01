"use scrict";

var piece = {
    isPhysical: false
    , init: function () {
        this.displayObject = new createjs.Shape();
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
    , updatePosition: function () {
        if (!this.isPhysical) {
            throw "this is not a physical object";
        }
        this.x = this.body.GetWorldCenter().x * this.scale;
        this.y = this.body.GetWorldCenter().y * this.scale;
    }
    , update: function () {
    }
};

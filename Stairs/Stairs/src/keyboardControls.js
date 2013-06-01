"use strict";

function KeyboardControls() {
    var that = this;
    document.addEventListener('keydown', function (event) {
        that.onkeydown(event);
    }, false);
}

KeyboardControls.prototype.onkeydown = function (e) {
    e = e || event;
    var key = e.keyCode;
    if (key === 37) {
        this.moveLeft();
    } else if (key === 38) {
        this.moveUp();
    } else if (key === 39) {
        this.moveRight();
    }
};

KeyboardControls.prototype.moveLeft = function () {

};

KeyboardControls.prototype.moveRight = function () {

};

KeyboardControls.prototype.moveUp = function () {
};
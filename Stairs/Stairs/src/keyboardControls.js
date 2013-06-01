"use strict";

function createKeyboardControls() {
    var controls = {};
    document.addEventListener('keydown', function (event) {
        controls.onkeydown(event);
    }, false);
    controls.onkeydown = function (e) {
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
    controls.moveLeft = function () {

    };
    controls.moveRight = function () {

    };
    controls.moveUp = function () {

    };
    return controls;
}

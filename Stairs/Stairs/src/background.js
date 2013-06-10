"use strict";

function createBackground(spec) {
    var background = Object.create(piece);
    background.fill = '#d0e7f9';
    background.width = spec.width();
    background.height = spec.height;
    background.update = function() {
        this.displayObject
            .graphics
            .clear()
            .beginFill(this.fill)
            .drawRect(0, 0, this.width, this.height);
        return this;
    };
    return background.init();
}

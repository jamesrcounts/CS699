"use strict";

function evenVerticalSpacing(board, n) {
    var y, step;
    y = 0;
    step = board.height() / n;

    function next() {
        var pos = {
            x: Math.random() * board.width(),
            y: y
        };
        y += step;
        return pos;
    }

    return next;
}

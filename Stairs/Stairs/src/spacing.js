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

function createCloseHorizontalSpacing(pieceWidth) {
    return function (board, n) {
        var w, count;
        w = pieceWidth;
        count = n;
        
        return function() {

        };
    };
}

function randomSpacing(board) {
    return function() {
        return {
            x: Math.random() * board.width(),
            y: Math.random() * board.height()
        };
    };
}


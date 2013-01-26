var clear = function (ctx) {    
    // draw rectangle same size as canvas
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.closePath();

    // fill with blue
    ctx.fillStyle = '#d0e7f9';
    ctx.fill();
}

var game = document.getElementById('game');

var width = 320;
game.width = width;

var height = 500;
game.height = height;

var gameContext = game.getContext('2d');

clear(gameContext);


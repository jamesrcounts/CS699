var clear = function (ctx, width, height) {
    // draw rectangle same size as canvas
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.closePath();

    // fill with blue
    ctx.fillStyle = '#d0e7f9';
    ctx.fill();
}

var drawClouds = function (ctx, clouds, count) {
    for (var i = 0; i < count; i++) {
        var cloud = clouds[i];
        // draw a circle
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2, true);
        ctx.closePath();

        // fill it with semi-transparent white
        ctx.fillStyle = 'rgba(255,255,255,' + cloud.opacity + ')';
        ctx.fill();
    }
}

var makeCloud = function (width, height) {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 100,
        opacity: Math.random() / 2
    };
}

var gameProperties = {
    width: "320",
    height: "500",
    maxClouds: "10"
};

var game = document.getElementById('game');
game.width = gameProperties.width;
game.height = gameProperties.height;

var clouds = [];
for (var i = 0; i < gameProperties.maxClouds; i++) {
    clouds.push(makeCloud(gameProperties.width, gameProperties.height));
}

var gameContext = game.getContext('2d');
clear(gameContext, gameProperties.width, gameProperties.height);
drawClouds(gameContext, clouds, gameProperties.maxClouds);
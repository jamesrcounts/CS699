var makeGame = function () {
    return {
        width: "320",
        height: "500",
        maxClouds: "10",
        clouds: [],
        clearContext: function () {
            // draw rectangle same size as canvas
            this.context.beginPath();
            this.context.rect(0, 0, this.width, this.height);
            this.context.closePath();

            // fill with blue
            this.context.fillStyle = '#d0e7f9';
            this.context.fill();
        },
        drawClouds: function () {
            for (var i = 0; i < this.maxClouds; i++) {
                var cloud = this.clouds[i];

                // draw a circle
                this.context.beginPath();
                this.context.arc(cloud.x,
                    cloud.y,
                    cloud.radius,
                    0,
                    Math.PI * 2,
                    true);
                this.context.closePath();

                // fill it with semi-transparent white
                this.context.fillStyle = 'rgba(255,255,255,' + cloud.opacity + ')';
                this.context.fill();
            }
        },
        updateClouds: function (y) {
            for (var i = 0; i < this.maxClouds; i++) {
                var cloud = this.clouds[i];
                if (cloud.y - cloud.radius > this.height) {
                    // cloud is off canvas
                    this.clouds[i] = makeCloud(this.width, this.height);
                }
                else {
                    // cloud is on canvas
                    cloud.y += y;
                }
            }

        }
    };
}

var gameLoop = function (game) {
    game.clearContext();
    game.updateClouds(5);
    game.drawClouds();
}

var makeCloud = function (width, height) {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 100,
        opacity: Math.random() / 2
    };
}

var main = function () {
    var game = makeGame();

    var canvasElement = document.getElementById('game');
    canvasElement.width = game.width;
    canvasElement.height = game.height;

    for (var i = 0; i < game.maxClouds; i++) {
        var cloud = makeCloud(game.width, game.height);
        game.clouds.push(cloud);
    }

    game.context = canvasElement.getContext('2d');

    setInterval(function () {
        gameLoop(game);
    }, 1000 / 30);
};

main();
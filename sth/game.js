var gameLoop = function (game, player) {
    game.clearContext();
    game.updateClouds(5);
    game.drawClouds();

    player.accelerate(game.height);
    player.draw(game);
}
var makeCloud = function (width, height) {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 100,
        opacity: Math.random() / 2
    };
}
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

var makePlayer = function () {
    var img = new Image();
    img.src = "angel.png";
    return {
        frame: 0,
        image: img,
        interval: 0,
        width: 65,
        height: 95,
        x: 0,
        y: 0,
        yvelocity: 0,
        accelerate: function (height) {
            this.gravity(1);

            if (this.y < (height - this.height)) {
                // falling has no effect once her feet touch the "ground"
                this.moveTo(this.x, this.y + this.yvelocity);
            } else {
                // jump off the ground instead
                this.jump();
                this.y = this.y - 1;
            }

        },
        gravity: function (rate) {
            // gravity pulls down has no further effect at terminal 
            // velocity
            if (this.yvelocity <= 17) {
                this.yvelocity = this.yvelocity + rate;
            }
        },
        jump: function () {

            this.yvelocity = -17;
        },
        moveTo: function (x, y) {
            this.x = x;
            this.y = y;
        },
        draw: function (game) {
            try {
                game.context.drawImage(
                    this.image,
                    0,
                    this.height * this.frame,
                    this.width,
                    this.height,
                    this.x,
                    this.y,
                    this.width,
                    this.height);
            } catch (e) {
                // if drawing failed, the game loop will retry on the
                // next tick.
            }

            this.interval++;
            if (this.interval % 4 === 0) {
                this.frame = this.frame ^ 1;
                this.interval = 0;
            }
        }
    }
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

    var player = makePlayer();
    player.moveTo(~ ~((game.width - player.width) / 2), ~ ~((game.height - player.height) / 2));

    setInterval(function () {
        gameLoop(game, player);
    }, 1000 / 30);
};

main();
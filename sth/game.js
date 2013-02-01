var gameLoop = function (game, player) {
    game.clearContext();
    game.updateClouds(player);
    game.drawClouds();
    game.drawPlatforms();
    player.accelerate(game.height);
    game.updatePlatforms(player);
    player.draw(game);
};
var makeCloud = function (width, height) {
    return {
        x:Math.random() * width,
        y:Math.random() * height,
        radius:Math.random() * 100,
        opacity:Math.random() / 2
    };
};

var makePlatform = function (x, y, width, height, type) {
    var halfHeight = height / 2;
    var halfWidth = width / 2;
    var platform = {
        x:~~x,
        y:y,
        type:type,
        draw:function (ctx) {
            var gradient = ctx.createRadialGradient(
                this.x + halfWidth,
                this.y + halfHeight,
                5,
                this.x + halfWidth,
                this.y + halfHeight,
                45);
            gradient.addColorStop(0, this.primaryColor);
            gradient.addColorStop(1, this.secondaryColor);

            ctx.fillStyle = 'rgba(255,255,255,1)';
            ctx.fillStyle = gradient;
            ctx.fillRect(this.x, this.y, width, height);
        }
    };
    if (type === 1) {
        platform.primaryColor = "#AADD00";
        platform.secondaryColor = "#698B22";
        platform.behavior = function (player) {
            player.stop();
            player.jump(50);
        };

    } else {
        platform.primaryColor = "#FF8C00";
        platform.secondaryColor = "#EEEE00";
        platform.behavior = function (player) {
            player.stop();
            player.jump();
        };
    }
    return platform;
};
var makeGame = function () {
    return {
        width:320,
        height:500,
        maxClouds:10,
        maxPlatforms:7,
        platformWidth:70,
        platformHeight:20,
        platforms:[],
        clouds:[],
        clearContext:function () {
            // draw rectangle same size as canvas
            this.context.beginPath();
            this.context.rect(0, 0, this.width, this.height);
            this.context.closePath();

            // fill with blue
            this.context.fillStyle = '#d0e7f9';
            this.context.fill();
        },
        drawClouds:function () {
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
        drawPlatforms:function () {
            var ctx = this.context;
            this.platforms.forEach(function (platform) {
                platform.draw(ctx);
            });
        },
        updateClouds:function (player) {
            for (var i = 0; i < this.maxClouds; i++) {
                var cloud = this.clouds[i];
                if (cloud.y - cloud.radius > this.height) {
                    // cloud is off canvas
                    this.clouds[i] = makeCloud(this.width, this.height);
                }
                else {
                    // cloud is on canvas
                    var halfHeight = this.height * 0.4;
                    if ((player.y >= halfHeight) &&
                        (player.verticalVelocity < 0)) {
                        // player must appear to move
                        cloud.y += (-1 * player.verticalVelocity) * 0.5;
                    }

                }
            }
        },
        updatePlatforms:function (player) {

            var width = this.platformWidth;
            var height = this.platformHeight;
            var halfHeight = this.height * 0.4;
            var gameHeight = this.height;
            var that = this;
            if (player.verticalVelocity >= 0) {
                // falling
                this.platforms.forEach(function (platform) {
                    if (
                        (player.x < platform.x + width) &&
                            (player.x + player.width > platform.x) &&
                            (player.y + player.height > platform.y) &&
                            (player.y + player.height < platform.y + height)
                        ) {
                        // on the platform
                        platform.behavior(player);
                    }
                });
            }
            else {
                // jumping
                if (player.y >= halfHeight) {
                    // platform must appear to fall below the player
                    this.platforms.forEach(function (platform, index) {
                        platform.y += (-1 * player.verticalVelocity);

                        // platforms that disappear must be regenerated at the top
                        if(platform.y > that.height){
                            var type = 0;
                            if (~~(Math.random() * 5) === 0) {
                                type = 1;
                            }
                            platform = makePlatform(
                                Math.random() * (that.width - that.platformWidth),
                                platform.y - that.height,
                                that.platformWidth,
                                that.platformHeight,
                                type
                            );
                            that.platforms[index] = platform;
                        }
                    })
                }

            }
        }
    };
};

var makePlayer = function () {
    var img = new Image();
    img.src = "angel.png";
    return {
        frame:0,
        image:img,
        interval:0,
        width:65,
        height:95,
        x:0,
        y:0,
        verticalVelocity:0,
        accelerate:function (height) {
            this.gravity(1);

            var groundLevel = height - this.height;
            if (this.y < groundLevel) {
                // falling to the ground if we are not there yet
                this.fall(groundLevel, height);
            } else {
                // jump off the ground instead
                this.jump();
            }
        },
        gravity:function (rate) {
            // gravity pulls down/has no further effect at terminal
            // velocity
            if (this.verticalVelocity <= 17) {
                this.verticalVelocity = this.verticalVelocity + rate;
            }
        },
        fall:function (groundLevel, gameHeight) {
            var halfHeight = gameHeight * 0.4;

            var targetLevel = this.y + this.verticalVelocity;
            targetLevel = Math.max(halfHeight, targetLevel);  // for the background, if her position is at halfheight and her velocity is negative, background must move.
            targetLevel = Math.min(groundLevel, targetLevel);
            this.moveTo(this.x, targetLevel);
        },
        jump:function (force) {
            if (typeof force === "undefined") {
                force = 17;
            }
            // jumping pushes up
            this.verticalVelocity = force * -1;
            this.y = this.y - 1;
        },
        stop:function () {
            this.verticalVelocity = 0;
        },
        moveTo:function (x, y) {
            this.x = x;
            this.y = y;
        },
        moveLeft:function () {
            var leftEdge = this.x;
            if (leftEdge > 0) {
                this.moveTo(this.x - 5, this.y);
            }
        },
        moveRight:function (width) {
            var rightEdge = this.x + this.width;
            if (rightEdge < width) {
                this.moveTo(this.x + 5, this.y);
            }
        },
        draw:function (game) {
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
};

var main = function () {
    var game = makeGame();

    var canvasElement = document.getElementById('game');
    canvasElement.width = game.width;
    canvasElement.height = game.height;
    game.context = canvasElement.getContext('2d');

    for (var j = 0; j < game.maxClouds; j++) {
        var cloud = makeCloud(game.width, game.height);
        game.clouds.push(cloud);
    }

    var platformPosition = 0;
    for (var i = 0; i < game.maxPlatforms; i++) {
        var type = 0;
        if (~~(Math.random() * 5) === 0) {
            type = 1;
        }
        var platform = makePlatform(
            Math.random() * (game.width - game.platformWidth),
            platformPosition,
            game.platformWidth,
            game.platformHeight,
            type
        );
        game.platforms.push(platform);
        if (platformPosition < (game.height - game.platformHeight)) {
            platformPosition += ~~(game.height / game.maxPlatforms);
        }

    }


    var player = makePlayer();
    player.moveTo(~~((game.width - player.width) / 2), ~~((game.height - player.height) / 2));
    document.onmousemove = function (e) {
        if (player.x + canvasElement.offsetLeft > e.pageX) {
            player.moveLeft();
        } else if (player.x + canvasElement.offsetLeft < e.pageX) {
            player.moveRight(game.width);
        }
    };

    setInterval(function () {
        gameLoop(game, player);
    }, 1000 / 30);
};

main();
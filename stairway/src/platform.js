function pickANumber(number) {
    return ~~(Math.random() * number);
}

function PlatformFactory(normalBounce, superBounce, typeChooser) {
    var that = this;
    this.bounce = normalBounce;
    this.super = superBounce;

    this.chooser = function () {
        return pickANumber(5);
    };

    if (typeChooser) {
        this.chooser = typeChooser;
    }

    return(function () {
        return{
            make: function (number) {
                var platforms = [];
                for (var i = 0; i < number; i++) {
                    var platform = new Platform(that.bounce, that.super);
                    if (that.chooser() === 0) {
                        platform.setType('super');
                    }
                    platforms.push(platform);
                }
                return platforms;
            }
        };
    })();
}


function PlatformBounce(bounceFactor) {
    var that = this;
    this.bounce = 17;
    var pb = (function () {
        return {
            getBounceFactor: function () {
                return that.bounce;
            },
            setBounceFactor: function (factor) {
                var f = Math.max(factor, -2048);
                f = Math.min(f, 2048);
                that.bounce = f;
            }
        }
    })();

    if (bounceFactor) {
        pb.setBounceFactor(bounceFactor);
    }

    return pb;
}

function Platform(defaultBounce, superBounce) {
    var that = this;

    const lightGreen = "#AADD00";
    const darkGreen = "#698B22";
    const darkOrange = "#FF8C00";
    const lightOrange = "#EEEE00";

    const sizeIsSmall = /small/i;
    const sizeIsMedium = /medium/i;
    const sizeIsHuge = /huge/i;

    const superPlatform = /super/i;
    const normalPlatform = /normal/i;

    const leftDirection = /left/i;
    const rightDirection = /right/i;
    const nowhereDirection = /nowhere/i;

    const smallWidth = 70;


    this.bounce = defaultBounce;
    this.direction = 0;
    this.height = 20;
    this.width = smallWidth;
    this.primaryColor = darkOrange;
    this.secondaryColor = lightOrange;
    this.speed = 0;
    this.x = 0;
    this.y = 0;

    return (function () {
        return{
            draw: function (context) {
                var center = this.getCenter();
                var startCircle = {
                    originX: center.x,
                    originY: center.y,
                    radius: 5
                };
                var endCircle = {
                    originX: center.x,
                    originY: center.y,
                    radius: 45
                };
                var gradient = context.createRadialGradient(
                    startCircle.originX, startCircle.originY, startCircle.radius,
                    endCircle.originX, endCircle.originY, endCircle.radius);
                gradient.addColorStop(0, that.primaryColor);
                gradient.addColorStop(1, that.secondaryColor);
                context.fillStyle = gradient;
                context.fillRect(that.x, that.y, that.width, that.height);
            },
            getBounce: function () {
                return that.bounce.getBounceFactor();
            },
            getCenter: function () {
                return{
                    x: that.x + (that.width / 2),
                    y: that.y + (that.height / 2)
                }
            },
            getColors: function () {
                return[that.primaryColor, that.secondaryColor];
            },
            getLocation: function () {
                return {
                    x: that.x,
                    y: that.y
                };
            },
            getSize: function () {
                return{
                    width: that.width,
                    height: that.height
                };
            },
            getVelocity: function () {
                return {
                    speed: that.speed,
                    direction: that.direction
                };
            },
            go: function (direction, at) {
                if (leftDirection.test(direction)) {
                    that.direction = -1;
                    that.speed = at;
                } else if (rightDirection.test(direction)) {
                    that.direction = 1;
                    that.speed = at;
                } else if (nowhereDirection.test(direction)) {
                    that.direction = 0;
                    that.speed = 0;
                }
            },
            moveTo: function (X, Y) {
                that.x = X;
                that.y = Y;
            },
            setSize: function (platformSize) {
                if (sizeIsSmall.test(platformSize)) {
                    that.width = smallWidth;
                }
                else if (sizeIsMedium.test(platformSize)) {
                    that.width = smallWidth * 2;
                }
                else if (sizeIsHuge.test(platformSize)) {
                    that.width = smallWidth * 3;
                }
            },
            setType: function (platformType) {
                if (superPlatform.test(platformType)) {
                    that.primaryColor = lightGreen;
                    that.secondaryColor = darkGreen;
                    that.bounce = superBounce;
                } else if (normalPlatform.test(platformType)) {
                    that.primaryColor = darkOrange;
                    that.secondaryColor = lightOrange;
                    that.bounce = defaultBounce;
                }
            }                                         }
    })();
}
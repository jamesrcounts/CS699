function PlatformBounce(bounceFactor) {
    var that = this;
    this.bounce = 17;
    var pb = (function () {
        return {
            getBounceFactor:function () {
                return that.bounce;
            },
            setBounceFactor:function (factor) {
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
    const lightGreen = "#AADD00";
    const darkGreen = "#698B22";
    const darkOrange = "#FF8C00";
    const lightOrange = "#EEEE00";

    const superPlatform = /super/i;
    const normalPlatform = /normal/i;

    const smallSize = /small/i;
    const mediumSize = /medium/i;
    const hugeSize = /huge/i;

    const smallWidth = 70;
    const mediumWidth = 140;
    const hugeWidth = 210;

    const leftDirection = /left/i;
    const rightDirection = /right/i;
    const nowhereDirection = /nowhere/i;

    return{
        bounce:defaultBounce,
        direction:0,
        width:smallWidth,
        height:20,
        primaryColor:darkOrange,
        secondaryColor:lightOrange,
        speed:0,
        x:0,
        y:0,
        draw:function (context) {

        },
        getBounce:function () {
            return this.bounce.getBounceFactor();
        },
        getDirection:function () {
            return this.direction;
        },
        getPrimaryColor:function () {
            return this.primaryColor;
        },
        getSecondaryColor:function () {
            return this.secondaryColor;
        },
        getSpeed:function () {
            return this.speed;
        },
        getXLocation:function () {
            return this.x;
        },
        getYLocation:function () {
            return this.y;
        },
        go:function (direction, at) {
            if (leftDirection.test(direction)) {
                this.direction = -1;
                this.speed = at;
            } else if (rightDirection.test(direction)) {
                this.direction = 1;
                this.speed = at;
            } else if (nowhereDirection.test(direction)) {
                this.direction = 0;
                this.speed = 0;
            }
        },
        moveTo:function (X, Y) {
            this.x = X;
            this.y = Y;
        },
        setSize:function (platformSize) {
            if (smallSize.test(platformSize)) {
                this.width = smallWidth;
            }
            else if (mediumSize.test(platformSize)) {
                this.width = mediumWidth;
            } else if (hugeSize.test(platformSize)) {
                this.width = hugeWidth;
            }
        },
        setType:function (platformType) {
            if (superPlatform.test(platformType)) {
                this.primaryColor = lightGreen;
                this.secondaryColor = darkGreen;
                this.bounce = superBounce;
            } else if (normalPlatform.test(platformType)) {
                this.primaryColor = darkOrange;
                this.secondaryColor = lightOrange;
                this.bounce = defaultBounce;
            }
        }
    }
}

describe('Platform Size', function () {
    var platform = new Platform();
    it('is 70x20 by default', function () {
        expect(platform.width).toEqual(70);
        expect(platform.height).toEqual(20);
    });
    it('is 140x20 when medium', function () {
        platform.setSize('medium');
        expect(platform.width).toEqual(140);
        expect(platform.height).toEqual(20);
    });
    it('is 210x20 when huge', function () {
        platform.setSize('huge');
        expect(platform.width).toEqual(210);
        expect(platform.height).toEqual(20);
    });
    it('is 70x20 when small', function () {
        platform.setSize('small');
        expect(platform.width).toEqual(70);
        expect(platform.height).toEqual(20);
    });
});

describe('Platform', function () {
    var platform = new Platform(new PlatformBounce(), new PlatformBounce(50));
    it('has an orange gradient color by default', function () {
        expect(platform.getPrimaryColor()).toEqual("#FF8C00");
        expect(platform.getSecondaryColor()).toEqual("#EEEE00");
    });
    it('has a bounce factor of 17 by default', function () {
        expect(platform.getBounce()).toEqual(17);
    });
    it('has a green gradient color when super type', function () {
        platform.setType('super');
        expect(platform.getPrimaryColor()).toEqual("#AADD00");
        expect(platform.getSecondaryColor()).toEqual("#698B22");
    });
    it('has a bounce factor of 50 when super type', function () {
        platform.setType('super');
        expect(platform.getBounce()).toEqual(50);
    });
    it('is an orange gradient when normal', function () {
        platform.setType('normal');
        expect(platform.getPrimaryColor()).toEqual('#FF8C00');
        expect(platform.getSecondaryColor()).toEqual('#EEEE00');
    });
    it('has a bounce factor of 17 when normal', function () {
        platform.setType('normal');
        expect(platform.getBounce()).toEqual(17);
    });
});


describe('Platform Bounce', function () {
    var bounce = new PlatformBounce();
    it('has a normal bounce factor of 17 by default', function () {
        expect(bounce.getBounceFactor()).toEqual(17);
    });
    it('can have a user defined bounce factor', function () {
        bounce.setBounceFactor(43);
        expect(bounce.getBounceFactor()).toEqual(43);
    });
    it('can be constructed with a user defined bounce factor', function () {
        var udb = new PlatformBounce(57);
        expect(udb.getBounceFactor()).toEqual(57);
    });
    it('has a minimum bounce factor of -2048', function () {
        bounce.setBounceFactor(-4092);
        expect(bounce.getBounceFactor()).toEqual(-2048);
    });
    it('has a maximum bounce factor of 2048', function () {
        bounce.setBounceFactor(4092);
        expect(bounce.getBounceFactor()).toEqual(2048);
    });
});

describe('Platform Motion', function () {
    var platform = new Platform();
    it('has no movement by default', function () {
        expect(platform.getSpeed()).toEqual(0);
        expect(platform.getDirection()).toEqual(0);
    });
    it('can go left', function () {
        platform.go("left", 10);
        expect(platform.getSpeed()).toEqual(10);
        expect(platform.getDirection()).toEqual(-1);
    });
    it('can go right', function () {
        platform.go("right", 10);
        expect(platform.getSpeed()).toEqual(10);
        expect(platform.getDirection()).toEqual(1);
    });
    it('can stand still', function () {
        platform.go("nowhere");
        expect(platform.getSpeed()).toEqual(0);
        expect(platform.getDirection()).toEqual(0);
    });
});

describe('Platform Location', function () {
    var platform = new Platform();
    it('is at the origin by default', function () {
        expect(platform.getXLocation()).toEqual(0);
        expect(platform.getYLocation()).toEqual(0);
    });
    it('can be positioned', function () {
        platform.moveTo(10, 10);
        expect(platform.getXLocation()).toEqual(10);
        expect(platform.getYLocation()).toEqual(10);
    });
});

describe('Platform draw', function () {
    var platform = new Platform();
    var ctx = new ContextMock();
    platform.draw(ctx);
    var startCircle = {
        originX:35,
        originY:10,
        radius:5
    };
    var endCircle = {
        originX:35,
        originY:10,
        radius:45
    };
    it('creates a radial gradient', function () {
        var gradient = jasmine.createSpy('gradient');
        spyOn(ctx, 'createRadialGradient').andReturn(gradient);
        expect(ctx.createRadialGradient).toHaveBeenCalledWith(
            startCircle.originX,
            startCircle.originY,
            startCircle.radius,
            endCircle.originX,
            endCircle.originY,
            endCircle.radius);
        expect(gradient.addColorStop).toHaveBeenCalledWith(
            0,
            platform.getPrimaryColor());
        expect(gradient.addColorStop).toHaveBeenCalledWith(
            1,
            platform.getSecondaryColor());
    });
    it('uses the gradient as the fillStyle', function () {
        var gradient = jasmine.createSpy('gradient');
        spyOn(ctx, 'createRadialGradient').andReturn(gradient);
        expect(ctx.fillStyle).toEqual(gradient);
    });
    it('draws a rectangle', function () {
        spyOn(ctx, 'fillRect');
        expect(ctx.fillRect).toHaveBeenCalledWith(
            platform.x,
            platform.y,
            platform.width,
            platform.height);
    });
});

/*70x20
 var makePlatform = function (x, y, width, height, type) {
 var halfHeight = height / 2;
 var halfWidth = width / 2;

 if (type === 1) {
 platform.behavior = function (player) {
 player.stop();
 player.jump(50);
 };

 } else {
 platform.behavior = function (player) {
 player.stop();
 player.jump();
 };
 }
 return platform;
 };*/

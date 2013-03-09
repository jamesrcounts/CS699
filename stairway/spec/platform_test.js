describe('A Platform', function () {
    var platform = new Platform(new PlatformBounce(), new PlatformBounce(50));
    it('has an orange gradient color by default', function () {
        expect(platform.getColors()).toEqual(['#FF8C00', '#EEEE00']);
    });
    it('is 70x20 by default', function () {
        expect(platform.getSize()).toEqual({width: 70, height: 20});
    });
    it('has a bounce factor of 17 by default', function () {
        expect(platform.getBounce()).toEqual(17);
    });
    it('has a green gradient color when super type', function () {
        platform.setType('super');
        expect(platform.getColors()).toEqual(['#AADD00', '#698B22']);
    });
    it('has a bounce factor of 50 when super type', function () {
        platform.setType('super');
        expect(platform.getBounce()).toEqual(50);
    });
    it('has an orange gradient when normal', function () {
        platform.setType('normal');
        expect(platform.getColors()).toEqual(['#FF8C00', '#EEEE00']);
    });
    it('has a bounce factor of 17 when normal', function () {
        platform.setType('normal');
        expect(platform.getBounce()).toEqual(17);
    });
    it('is 140x20 when medium', function () {
        platform.setSize('medium');
        expect(platform.getSize()).toEqual({width: 140, height: 20});
    });
    it('is 210x20 when huge', function () {
        platform.setSize('huge');
        expect(platform.getSize()).toEqual({width: 210, height: 20});
    });
    it('is 70x20 when small', function () {
        platform.setSize('small');
        expect(platform.getSize()).toEqual({width: 70, height: 20});
    });
    it('has no movement by default', function () {
        expect(platform.getVelocity()).toEqual({speed: 0, direction: 0});
    });
    it('can go left', function () {
        platform.go("left", 10);
        expect(platform.getVelocity()).toEqual({speed: 10, direction: -1});
    });
    it('can go right', function () {
        platform.go("right", 20);
        expect(platform.getVelocity()).toEqual({speed: 20, direction: 1});
    });
    it('can stand still', function () {
        platform.go("nowhere");
        expect(platform.getVelocity()).toEqual({speed: 0, direction: 0});
    });
    it('is at the origin by default', function () {
        expect(platform.getLocation()).toEqual({x: 0, y: 0});
    });
    it('can be positioned', function () {
        platform.moveTo(10, 10);
        expect(platform.getLocation()).toEqual({x: 10, y: 10});
    });

});

describe('Drawing Platforms', function () {
    function CanvasGradientMock() {
        return{
            addColorStop: function () {
            }
        };
    }

    var platform = new Platform();
    var ctx = new ContextMock();

    var platformCenter = platform.getCenter();
    var startCircle = {
        originX: platformCenter.x,
        originY: platformCenter.y,
        radius: 5
    };
    var endCircle = {
        originX: platformCenter.x,
        originY: platformCenter.y,
        radius: 45
    };

    var gradient = new CanvasGradientMock();

    beforeEach(function () {
        spyOn(gradient, 'addColorStop');
        spyOn(ctx, 'createRadialGradient').andReturn(gradient);
        spyOn(ctx, 'fillRect');

    });

    it('creates a radial gradient', function () {
        var colors = platform.getColors();
        platform.draw(ctx);
        expect(ctx.createRadialGradient).toHaveBeenCalledWith(
            startCircle.originX, startCircle.originY, startCircle.radius,
            endCircle.originX, endCircle.originY, endCircle.radius);
        expect(gradient.addColorStop).toHaveBeenCalledWith(0, colors[0]);
        expect(gradient.addColorStop).toHaveBeenCalledWith(1, colors[1]);
    });

    it('uses the gradient as the fillStyle', function () {
        expect(ctx.fillStyle).toEqual(gradient);
    });

    it('draws a rectangle', function () {
        var platformSize = platform.getSize();
        var platformLocation = platform.getLocation();
        platform.draw(ctx);

        expect(ctx.fillRect).toHaveBeenCalledWith(
            platformLocation.x,
            platformLocation.y,
            platformSize.width,
            platformSize.height);
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

describe('Platform generator', function () {
    var state = 0;
    var generator = new PlatformFactory(
        new PlatformBounce(),
        new PlatformBounce(50),
        function () {
            var rem = state % 2;
            state++;
            return rem;
        });
    var platforms = generator.make(7);
    it('generates as many platforms as you like', function () {
        expect(platforms.length).toEqual(7);
    });
    it('makes some of the platforms into super platforms', function () {
        var superPlatforms = platforms.filter(function (element) {
            return element.getBounce() === 50;
        });
        expect(superPlatforms.length).toEqual(4);
    });
});
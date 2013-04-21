var sth = (function () {
    var board, debugBoard;

    return {
        Board: function (canvas) {
            if (!canvas) {
                throw new Error("You must initialize a Board with a Canvas reference");
            }

            var defaultWidth = 320
                , defaultHeight = 500
            ;

            canvas.width = defaultWidth;
            canvas.height = defaultHeight;

            return {
                compareToX: function (point) {
                    if (point.x < 0) {
                        return -1;
                    }
                    if (point.x > canvas.width) {
                        return 1;
                    }
                    return 0;
                },
                size: { width: canvas.width, height: canvas.height },
                world: new box2d.World()
            };
        },
        Platform: function (scale, location, extent) {
            return {
                extent: extent,
                location: location,
                size: {
                    width: extent.horizontal * 2,
                    height: extent.vertical * 2
                },
                origin: {
                    x: location.x - extent.horizontal,
                    y: location.y - extent.vertical
                },
                terminal: {
                    x: location.x + extent.horizontal,
                    y: location.y + extent.vertical
                },
                bodyDef: (function () {
                    var def = new box2d.BodyDefinition();
                    def.type = box2d.Body.Static;
                    def.position.x = location.x;
                    def.position.y = location.y;
                    return def;
                })(),
                fixDef: (function () {
                    var def = new box2d.FixtureDefinition();
                    def.density = 1.0;
                    def.friction = 0.5;
                    def.restitution = 1;
                    def.shape = new box2d.Polygon();
                    def.shape.SetAsBox(extent.horizontal / scale, extent.vertical / scale);
                    return def;
                })()
            }
        },
        initialize: function () {
            board = new Board().initialize();
            debugBoard = new DebugBoard(board).initialize();
        }
    }
})()
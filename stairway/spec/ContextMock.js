function ContextMock() {
    return{
        closePathCalls: 0,
        closePath: function () {
            this.closePathCalls++;
        },
        beginPathCalls: 0,
        beginPath: function () {
            this.beginPathCalls++;
        },
        createRadialGradient: function () {
        },
        fillCalls: 0,
        fill: function () {
            this.fillCalls++;
        },
        fillRect: function () {
        },
        rect: function (x, y, width, height) {
            this.rectArgs = [x, y, width, height];
        }
    }
}

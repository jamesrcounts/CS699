const sizeIsSmall = /small/i;
const sizeIsMedium = /medium/i;
const sizeIsHuge = /huge/i;
const skyBlue = '#d0e7f9';
const defaultBoardWidth = 320;

function Board() {
    var that = this;
    this.width = defaultBoardWidth;
    this.height = 500;

    return (function () {
        return{
            draw: function (canvas, context) {
                canvas.width = that.width;
                canvas.height = that.height;
                context.beginPath();
                context.rect(0, 0, that.width, that.height);
                context.closePath();
                context.fillStyle = this.getColor();
                context.fill();
            },
            getColor: function () {
                return skyBlue;
            },
            getSize: function () {
                return {
                    width: that.width,
                    height: that.height
                };
            },
            setSize: function (size) {
                if (sizeIsSmall.test(size)) {
                    that.width = defaultBoardWidth;
                } else if (sizeIsMedium.test(size)) {
                    that.width = defaultBoardWidth * 2;
                } else if (sizeIsHuge.test(size)) {
                    that.width = defaultBoardWidth * 3;
                }
            }}
    })();
}
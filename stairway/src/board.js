function Board() {
    var sizeIsSmall = /small/i;
    var sizeIsMedium = /medium/i;
    var sizeIsHuge = /huge/i;
    var skyBlue = '#d0e7f9';
    return {
        width:320,
        height:500,
        draw:function (canvas, context) {
            canvas.width = this.width;
            canvas.height= this.height;
            context.beginPath();
            context.rect(0, 0, this.width, this.height);
            context.closePath();
            context.fillStyle = this.getColor();
            context.fill();
        },
        getColor:function () {
            return skyBlue;
        },
        setSize:function (size) {
            if (sizeIsSmall.test(size)) {
                this.width = 320;
            } else if (sizeIsMedium.test(size)) {
                this.width = 640;
            } else if (sizeIsHuge.test(size)) {
                this.width = 960;
            }
        }
    };
}
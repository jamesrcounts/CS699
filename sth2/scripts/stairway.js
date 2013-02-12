window.addEvent('domready', function () {
    var model = {
        initialize:function () {
            this.gameSize = 1;
        },
        update:function(){
            this.gameSize = (this.gameSize + 1) % 3;
        }
    };
    var gameSizeElement = document.getElementById('designer');


    new Tangle(gameSizeElement, model);
});
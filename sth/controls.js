window.addEvent('domready', function () {

    var rootElement = document.getElementById("Fun");
    var model = {
        initialize:function () {
            this.minutes = 5;
        },
        update:function () {
            this.minutes = this.minutes;
        }
    };
    var tangle = new Tangle(rootElement, model);

});
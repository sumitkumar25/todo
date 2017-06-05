/**
 * Created by sukumar on 5/29/2017.
 */
(function (window) {
    function jsApp(name) {
        this.storage = new app.Store(name);
        this.model = new app.Model(this.storage);
        this.view = new app.View();
        this.controller = new app.Controller(this.model, this.view);
    }

    var jsApp = new jsApp("js-app");
    window.onload = function () {
        jsApp.controller.initialize();
    }
})(window)
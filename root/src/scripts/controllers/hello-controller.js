/**
 * Created by aurelien.vannier on 30/10/2014.
 */
define([
    'controllers/base/controller',
    'models/hello-world',
    'views/hello-world-view'
], function (Controller, HelloWorld, HelloWorldView) {
    'use strict';

    var HelloWorldController = Controller.extend({
        show: function (params) {
            this.model = new HelloWorld();
            this.view = new HelloWorldView({
                model: this.model,
                region: 'main'
            });
        }
    });

    return HelloWorldController;
});

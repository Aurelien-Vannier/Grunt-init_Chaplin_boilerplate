define([
    'views/base/view',
    'text!templates/hello-world.hbs'
], function (View, template) {
    'use strict';

    var HelloWorldView = View.extend({
        // Automatically render after initialize
        autoRender: true,
        template: template
    });

    return HelloWorldView;
});

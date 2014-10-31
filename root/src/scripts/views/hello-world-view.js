define([
    'views/base/view',
    'templates/hello-world'
], function (View, template) {
    'use strict';

    var HelloWorldView = View.extend({
        // Automatically render after initialize
        autoRender: true,
        template: template
    });

    return HelloWorldView;
});

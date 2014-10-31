/**
 * Created by aurelien.vannier on 30/10/2014.
 */
/**
 * Created by aurelien.vannier on 30/10/2014.
 */
define([
    'views/base/view',
    'templates/common/navbar'
], function(View, template) {
    'use strict';

    var NavbarView = View.extend({
        // Automatically render after initialize
        autoRender: true,
        region: 'navbar',
        tagName: 'nav',
        className: 'navbar navbar-default',
        attributes:{
            'role': 'navigation'
        },
        template: template
    });

    return NavbarView;
});

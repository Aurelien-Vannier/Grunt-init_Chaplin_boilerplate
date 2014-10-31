/**
 *
 */
define(['views/base/view', 'templates/site'],
    function (View, template) {
    'use strict';

    var SiteView = View.extend({
        container: 'body',
        id: 'site-container',
        regions: {
            navbar: '#navbar-container',
            main: '#main-container',
            footer: '#footer-container'
        },

        template: template
    });

    return SiteView;
});

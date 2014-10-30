/**
 * Created by aurelien.vannier on 30/10/2014.
 */
define(['chaplin', 'views/site-view', 'views/common/footer-view', 'views/common/navbar-view'],
    function (Chaplin, SiteView, FooterView, NavbarView) {
    'use strict';

    var Controller = Chaplin.Controller.extend({
        // Place your application-specific controller features here.
        beforeAction: function () {
            this.reuse('site', SiteView);
            this.reuse('footer', FooterView);
            this.reuse('navbar', NavbarView);
        }
    });

    return Controller;
});

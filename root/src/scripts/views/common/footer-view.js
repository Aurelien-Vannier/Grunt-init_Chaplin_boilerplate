/**
 * Created by aurelien.vannier on 30/10/2014.
 */
define([
    'views/base/view',
    'text!templates/common/footer.hbs'
], function(View, template) {
    'use strict';

    var FooterView = View.extend({
        // Automatically render after initialize
        autoRender: true,
        region: 'footer',
        template: template
    });

    return FooterView;
});

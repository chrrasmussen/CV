define([
    './module'
], function (module) {
    'use strict';
    
    // SOURCE: https://gist.github.com/naoyeye/8220054
    module.filter('nl2br', function($sce){
        return function(msg, is_xhtml) { 
            is_xhtml = is_xhtml || true;
            var breakTag = (is_xhtml) ? '<br />' : '<br>';
            msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
            return $sce.trustAsHtml(msg);
        };
    });
});
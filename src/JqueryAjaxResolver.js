(function () {
    'use strict';

    /**
     * @class
     */
    var JqueryAjaxResolver = (function () {

        /**
         * @param {Object} xhr - jqXHR object
         * @constructor
         */
        function JqueryAjaxResolver(xhr) {
            this.xhr = xhr;
        }

        JqueryAjaxResolver.prototype = {

            /**
             * @param  {Function} successCb
             * @param  {Function} failureCb
             */
            onResolve: function (successCb, failureCb) {
                this.xhr
                    .done(function (message) {
                        successCb(message);
                    })
                    .fail(function (xhr) {
                        failureCb(xhr);
                    });
            }
        };

        return JqueryAjaxResolver;
    }());


    var root = this;

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = JqueryAjaxResolver;
        }
        exports.JqueryAjaxResolver = JqueryAjaxResolver;
    } else {
        root.JqueryAjaxResolver = JqueryAjaxResolver;
    }

}.call(this));
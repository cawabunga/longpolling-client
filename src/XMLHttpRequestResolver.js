(function () {
    'use strict';

    /**
     * @class
     */
    var XMLHttpRequestResolver = (function () {

        /**
         * @param {XMLHttpRequest} xhr
         * @constructor
         */
        function XMLHttpRequestResolver(xhr) {
            this.xhr = xhr;
        }

        XMLHttpRequestResolver.prototype = {

            /**
             * @public
             * @param  {Function} successCb
             * @param  {Function} failureCb
             */
            onResolve: function (successCb, failureCb) {
                var that = this;

                this.xhr.onreadystatechange = function () {
                    if (this.readyState !== this.DONE) return;

                    if (200 <= this.status && this.status <= 308) {
                        successCb(that.processResponse(this));
                    }
                    // Do not fail an abort
                    else if (this.status !== 0) {
                        failureCb(this);
                    }
                };

                this.xhr.onerror = function (error) {
                    failureCb(this);
                };
            },

            /**
             * @private
             * @param  {XMLHttpRequest} xhr
             * @returns {(Object|string)}
             */
            processResponse: function (xhr) {
                var contentType = xhr.getResponseHeader('Content-type'),
                    response = xhr.responseText;

                if (contentType.indexOf('application/json') === 0) {
                    response = JSON.parse(response);
                }

                return response;
            }
        };

        return XMLHttpRequestResolver;
    }());


    var root = this;

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = XMLHttpRequestResolver;
        }
        exports.XMLHttpRequestResolver = XMLHttpRequestResolver;
    } else {
        root.XMLHttpRequestResolver = XMLHttpRequestResolver;
    }

}.call(this));
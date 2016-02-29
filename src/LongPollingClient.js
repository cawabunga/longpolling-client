(function () {
    'use strict';

    /**
     * @class
     */
    var LongPollingClient = (function () {

        /**
         * @param {Object} config
         * @constructor
         */
        function LongPollingClient(config) {
            this.config = config;
        }

        LongPollingClient.prototype = {

            /**
             * @public
             */
            start: function () {
                this.aborted = false;
                this.loop();
            },

            /**
             * @public
             */
            abort: function () {
                this.xhr.abort();
                this.aborted = true;
            },

            /**
             * @private
             */
            loop: function () {
                if (this.aborted) {
                    return;
                }

                var xhr = this.doRequest();
                this.handleXhr(xhr);
            },

            /**
             * @private
             * @returns {(XMLHttpRequest|Object)}
             */
            doRequest: function () {
                return this.xhr = this.config.xhrGetter();
            },

            /**
             * @private
             * @param {(XMLHttpRequest|Object)} xhr
             */
            handleXhr: function (xhr) {
                var that = this,
                    xhrResolver = this.getXhrResolver(xhr);

                xhrResolver.onResolve(function (message) {
                    that.success(message);
                }, function (xhr) {
                    that.failure(xhr);
                });
            },

            /**
             * @param  {(XMLHttpRequest|Object)} xhr
             * @return {Object}
             */
            getXhrResolver: function (xhr) {
                var resolver;

                // XMLHttpRequest object
                if (xhr instanceof XMLHttpRequest) {
                    resolver = require('./XMLHttpRequestResolver');
                }

                // jqXHR object
                else if (xhr.fail && xhr.done) {
                    resolver = require('./JqueryAjaxResolver');
                }

                return new resolver(xhr);
            },

            /**
             * @private
             */
            success: function (message) {
                this.config.success(message);
                this.loop();

                this.afterRequest();
            },

            /**
             * @private
             * @param  {(XMLHttpRequest|Object)} xhr
             */
            failure: function (xhr) {
                this.config.failure(xhr);
                this.afterRequest();
            },

            /**
             * @private
             */
            afterRequest: function () {
            }
        };

        return LongPollingClient;
    }());

    var root = this;

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = LongPollingClient;
        }
        exports.LongPollingClient = LongPollingClient;
    } else {
        root.LongPollingClient = LongPollingClient;
    }

}.call(this));
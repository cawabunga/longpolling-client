(function () {
    'use strict';

    /**
     * @class
     */
    var LongPollingClient = (function () {

        /**
         * @constructor
         * @param {Object} config
         * @constructor
         */
        function LongPollingClient(config) {
            this.config = config;
            this.failureTimeout = config.failureTimeout == null ? 30000 : config.failureTimeout;
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
             * @returns {XMLHttpRequest}
             */
            doRequest: function () {
                return this.xhr = this.config.xhrGetter();
            },

            /**
             * @private
             * @param {XMLHttpRequest} xhr
             */
            handleXhr: function (xhr) {
                var that = this;

                xhr.onreadystatechange = function () {
                    if (this.readyState !== this.DONE) return;

                    if (200 <= this.status && this.status <= 308) {
                        that.config.success(this.responseText);
                        that.loop();
                    } else {
                        that.config.failure(this);
                        setTimeout(function () {
                            that.loop();
                        }, that.failureTimeout);
                    }

                    that.afterRequest();
                };
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
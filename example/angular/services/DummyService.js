'use strict';

/**
 * Example of usage LongPollingClient, basic stuffs are from real project.
 * Expecting PubSub, API_CONFIG and SessionService already defined.
 */
var DummyService = function (LongPollingClient, PubSub, API_CONFIG, SessionService) {

    var CHANNEL_NAME = 'comet';

    var config = {
        success: function (result) {
            PubSub.publish(CHANNEL_NAME, result);
        },
        failure: angular.noop,
        xhrGetter: function () {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', API_CONFIG.POLLING_URL, true);

            // Setting Authorization headers (for JWT against cookie)
            var authHeaders = SessionService.getAuthHeaders();
            _.each(authHeaders, function (value, header) {
                xhr.setRequestHeader(header, value);
            });

            // Invoke xhr
            xhr.send();

            return xhr;
        }
    };

    var client = new LongPollingClient(config);
    client.start();

    // Also you can abort pending request if user logged out
    SessionService.onLogout(function () {
        client.abort();
    });

    // And restore if logged in
    SessionService.onLogin(function () {
        client.start();
    });

};

DummyService.$inject = ['LongPollingClient', 'PubSub', 'API_CONFIG', 'SessionService'];

module.exports = function (ng) {
    ng.service('DummyService', DummyService);
};
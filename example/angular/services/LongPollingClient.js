'use strict';

var Factory = function ($scope) {

    var LongPollingClient = require('../index');

    // You can use your own extend method (coffeescript or ecmas6 extends)
    var ngLongPollingClient = function () {
        LongPollingClient.apply(this);
    };

    ngLongPollingClient.prototype = Object.assign({}, LongPollingClient.prototype, {
        afterRequest: function () {
            $scope.$digest();
        }
    });

    return ngLongPollingClient;
};

Factory.$inject = ['$rootScope'];

module.exports = function (ng) {
    ng.factory('LongPollingClient', Factory);
};
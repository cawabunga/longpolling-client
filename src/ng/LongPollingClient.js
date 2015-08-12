'use strict';

var Factory = function ($scope, $timeout) {
    var LongPollingClient = require('../LongpollingClient'),
        assign = require('../helper').assign;

    var NgLongPollingClient = function () {
        LongPollingClient.apply(this, arguments);
    };

    assign(NgLongPollingClient.prototype, LongPollingClient.prototype, {
        afterRequest: function () {
            $timeout(function () {
                $scope.$digest();
            });
        }
    });

    return NgLongPollingClient;
};

Factory.$inject = ['$rootScope', '$timeout'];

module.exports = function (ng) {
    ng.factory('LongPollingClient', Factory);
};
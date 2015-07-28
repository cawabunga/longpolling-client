var ng = angular.module('yourApp', []);
require('./services/LongPollingClient')(ng);
require('./services/DummyService')(ng);

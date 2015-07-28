var LongPollingClient = require('../index');

var config = {
    success: function (result) {
        console.log('Response text:', result);
    },
    failure: function (xhr) {
        console.error('Request failed', xhr);
    },
    xhrGetter: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/subscribe', false);
        return xhr;
    },
    failureTimeout: 20000 // in ms, default value 30 seconds
};

var client = new LongPollingClient(config);

client.start();

// and then `client.abort();` if needed

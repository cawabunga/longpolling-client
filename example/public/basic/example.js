
// Client configuration example

/**
 * @prop {Function} success - Invokes after success response
 * @prop {Function} failure - Invokes after error response (e.g. 404, 500 http errors)
 * @prop {Function} xhrGetter
 * @prop {number} failureTimeout - Time in ms that client should wait until next try, default 30 seconds
 */
var config = {
    /**
     * @param {string} result
     */
    success: function (result) {
        console.log('Response text:', result);
        appendMessage(result);
    },

    /**
     * @param {XMLHttpRequest} xhr
     */
    failure: function (xhr) {
        console.error('Request failed', xhr);
    },

    /**
     * @returns {XMLHttpRequest}
     */
    xhrGetter: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/subscribe', true);
        xhr.send();
        return xhr;
    },

    failureTimeout: 20000
};

var client = new LongPollingClient(config);


// Client usage example

var startBtn = document.getElementById('startBtn'),
    abortBtn = document.getElementById('abortBtn'),
    results = document.getElementById('result');

startBtn.addEventListener('click', function () {
    client.start();
});

abortBtn.addEventListener('click', function () {
    client.abort();
});

function appendMessage(message) {
    var element = document.createElement('li');
    element.innerHTML = message;
    results.appendChild(element);
}
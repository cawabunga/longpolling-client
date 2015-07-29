var express = require('express');
var app = express();
var _ = require('underscore');

app.use(express.static(__dirname + '/public'));

app.get('/api/subscribe', function (req, res) {
    var responseTime = _.random(1000, 3000);
    setTimeout(function () {
        res.send({
            message: 'Hello',
            ts: Date.now(),
            response_ms: responseTime
        });
    }, responseTime);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});
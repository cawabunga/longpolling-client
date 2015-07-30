require('jasmine-ajax');
var LongPollingClient = require('../index');

describe('LongPollingClient', function() {

    // Mocking XHRs

    beforeEach(function() {
        jasmine.Ajax.install();
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
        jasmine.clock().uninstall();
    });

    var client, successCb, failureCb;

    beforeEach(function() {
        successCb = jasmine.createSpy('success callback');
        failureCb = jasmine.createSpy('failure callback');
        var xhrGetter = function() {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'dummy_url', true);
            xhr.send();
            return xhr;
        };
        client = new LongPollingClient({
            success: successCb,
            failure: failureCb,
            xhrGetter: xhrGetter,
            failureTimeout: 1
        });
    });

    it('should open connection', function() {
        client.start();
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('dummy_url');
    });

    it('should call success function after success response', function() {
        client.start();

        jasmine.Ajax.requests.mostRecent().respondWith({
            status: 200,
            "responseText": '{}'
        });

        expect(successCb).toHaveBeenCalled();
    });

    it('should do another request after success response', function () {
        client.start();

        jasmine.Ajax.requests.mostRecent().respondWith({status: 200, responseText: '{}'});
        expect(successCb.calls.count()).toEqual(1);

        jasmine.Ajax.requests.mostRecent().respondWith({status: 200, responseText: '{}'});
        expect(successCb.calls.count()).toEqual(2);
    });

    it('should call failure function after error response', function () {
        client.start();

        jasmine.Ajax.requests.mostRecent().respondWith({status: 500});

        expect(failureCb).toHaveBeenCalled();
    });

    it('should wait before doing another request after error response', function () {
        client.start();

        jasmine.Ajax.requests.mostRecent().respondWith({status: 500});
        expect(failureCb.calls.count()).toEqual(1);

        jasmine.clock().tick(2);

        jasmine.Ajax.requests.mostRecent().respondWith({status: 500});
        expect(failureCb.calls.count()).toEqual(2);
    });

    // doesn't work maybe because of jasmine.Ajax, but should
    // todo: fix this
    xit('should abort pending request', function () {
        client.start();
        client.abort();

        jasmine.Ajax.requests.mostRecent().respondWith({status: 200});
        expect(successCb).not.toHaveBeenCalled();
        expect(failureCb).not.toHaveBeenCalled();
    });

    it('should call afterRequest method after each request', function () {
        spyOn(client, 'afterRequest');
        client.start();

        jasmine.Ajax.requests.mostRecent().respondWith({status: 200, responseText: '{}'});
        expect(client.afterRequest.calls.count()).toEqual(1);

        jasmine.Ajax.requests.mostRecent().respondWith({status: 500});
        expect(client.afterRequest.calls.count()).toEqual(2);
    });

});
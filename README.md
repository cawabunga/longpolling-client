Simple Comet (Long-Polling) Implementation on Javascript. It uses native [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).

You can load LongPollingClient library directly into browser or you can require it as CommonJS module.

For details see source and example directory.

 Also you can send me a pull requests for improvements.

##Example
For live example:

- `git clone https://github.com/cawabunga/longpolling-client`
- `cd longpolling-client`
- `npm install`
- `npm run example`

Then open [http://localhost:3000/basic/](http://localhost:3000/basic/) in your browser, don't forget to open firebug console.

There are also concept of angular wrapper in the [example dir](https://github.com/cawabunga/longpolling-client/tree/master/example).

##Test
For running test suites:

- `git clone https://github.com/cawabunga/longpolling-client`
- `cd longpolling-client`
- `npm install`
- `npm test`
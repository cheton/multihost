# multihost [![build status](https://travis-ci.org/cheton/multihost.svg?branch=master)](https://travis-ci.org/cheton/multihost) [![Coverage Status](https://coveralls.io/repos/cheton/multihost/badge.svg?branch=master&service=github)](https://coveralls.io/github/cheton/multihost?branch=master)

[![NPM](https://nodei.co/npm/multihost.png?downloads=true&stars=true)](https://nodei.co/npm/multihost/)  

Hosting multiple Express apps on the same server.

## Installation
```bash
$ npm install --save multihost
```

## API

```js
var multihost = require('multihost')
```

### multihost(options)

Returns a middleware to host an Express application.

#### Options

The function takes an option `options` object that may contain any of the following keys:

##### hosts

A virtual host string or an array of virtual host strings.

##### route

A route string containing the URI to be matched.

##### server

An Express app as shown below:
```js
var app = express();
```

## Example
```js
var app = express();
var fooApp = express();
var barApp = express();
var mainApp = express();
var multihost = require('multihost');

app.use(multihost({
    hosts: 'foo.com',
    server: fooApp
}));

app.use(multihost({
    hosts: 'bar.com',
    server: barApp
}));

app.use(multihost({
    hosts: '*.com',
    route: '/foo',
    server: fooApp
}));

app.use(multihost({
    hosts: '*.com',
    route: '/bar',
    server: barApp
}));

app.use(multihost({
    hosts: [
        '*.com',
        'localhost'
    ],
    server: mainApp
}));
```

## License

[MIT](LICENSE)

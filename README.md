## web-tracer

Tiny tool that helps with debugging of remote services. It binds on externally visible hostname and logs
all HTTP(S) traffic it receives.


### Installation

```
npm i web-tracer -g
```


### Usage

```
  Usage: web-tracer [options]

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    -h, --host [name]           Local host
    -p, --port [number]         Local port
    -e, --external [subdomain]  Custom subdomain name, e.g. foobar

```


### Using programmatically


```
var webtracer = require('web-tracer')

webtracer({
  external: 'mysubdomain', // to bind on https://mysubdomain.localtunnel.me/
  port: 3000,
  host: 'localhost',
  onRequest: function(trace) {
    console.log(trace)
  }
}, function(err, tunnel) {
  console.log('Tracer has started', err, tunnel)
})
```

### License

MIT

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

### License

MIT

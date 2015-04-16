var _ = require('lodash'),
  express = require('express'),
  bodyParser = require('body-parser'),
  localtunnel = require('localtunnel');


module.exports = function(opts, cb) {

  var app = express()
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())


  app.all('/*', function(req, res, next) {
    var trace = _.pick(req, 'url', 'method', 'query', 'body', 'headers', 'protocol')

    if (opts.onRequest)
      opts.onRequest(trace);

    res.set('Content-Type', 'text/plain')
    res.send(JSON.stringify(trace, null, 2))
  })


  var server = app.listen(opts.port, opts.host, function(err) {
    if (err) return console.error(err)

    var lt = localtunnel(opts.port, {subdomain: opts.external}, cb)

    lt.on('close', function() {
      server.close()
      if (opts.onClose) opts.onClose()
    })
  })
}

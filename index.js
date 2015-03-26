var util = require('util'),
  _ = require('lodash'),
  express = require('express'),
  bodyParser = require('body-parser'),
  localtunnel = require('localtunnel');


var app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.all('/*', function(req, res, next) {
  var trace = _.pick(req, 'url', 'method', 'query', 'body', 'headers', 'protocol')

  res.set('Content-Type', 'text/plain')
  res.send(JSON.stringify(trace, null, 2))

  console.log('Time: ', new Date().toISOString())
  console.log(util.inspect(trace, {colors: true, depth: 64}))
  console.log('\n========================================\n')
})


module.exports = function(opts) {
  app.listen(opts.port, opts.host, function(err) {
    if (err) return console.error(err)
    console.log('Listening on port %s:%d', opts.host, opts.port)

    // It's random it `--subdomain` not specified
    var tunnel = localtunnel(opts.port, {subdomain: opts.external}, function(err, tunnel) {
        if (err) return console.error(err)
        console.log('External address is: %s', tunnel.url)
    })

    tunnel.on('close', function() {})
  })
}

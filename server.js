var path = require('path'),
    express = require('express'),
    app = express(),
    port = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'favicon')))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

var server = app.listen(port, function() {
	var host = server.address().address
	console.log('Pomodo listening at http://%s:%s', host, port)
})

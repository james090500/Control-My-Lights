const express = require('express')
const app = express()
const http = require('http').Server(app)
const bodyParser = require('body-parser');
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html')
})

app.use('/api', require('./api'));

http.listen(PORT, function () {
    console.log('listening on *:', PORT)
})

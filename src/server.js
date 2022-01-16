import http from 'http';
import webSocket from 'ws';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + "/public"))

app.get('/', (req, res) => res.render('home'))
app.get('/*', (req, res) => res.redirect('/'));

const server = http.createServer(app)
const wss = new webSocket.Server({ server });

wss.on('connection', (socket) => {
  console.log('Connect to Browser!');
  socket.on('close', () => {
    console.log("Disconnected from the Browser!");
  })
  socket.on('message', (message) => {
    console.log("message from the Browser : ", message.toString());
  })
  socket.send('hey!! user');
});

const handleListen = () => {
  console.log('listen http://localhost:2201');
};
server.listen(2201, handleListen);
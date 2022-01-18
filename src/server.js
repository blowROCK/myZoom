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
const sockets = [];
wss.on('connection', (socket) => {
  sockets.push(socket);
  socket['nickname'] = 'Anon';
  socket.on('close', () => {
    console.log("Disconnected from the Browser!");
  })
  socket.on('message', (msg) => {
    const message = JSON.parse(msg.toString());
    switch(message.type) {
      case 'new_message':
        sockets.forEach((s) => {
          s.send(`${socket.nickname} : ${message.playload.toString()}`);
        })
        break;
      case 'nickname':
        socket['nickname'] = message.playload;
        break;
    }
  })
});

const handleListen = () => {
  console.log('listen http://localhost:2201');
};
server.listen(2201, handleListen);
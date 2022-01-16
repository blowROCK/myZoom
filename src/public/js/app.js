const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
  console.log("Connected to the Server");
});

socket.addEventListener('message', (message) => {
  console.log("Just got this : ", message.data);
});

socket.addEventListener('close', () => {
  console.log("Disconnected From Server");
}); 

setTimeout(() => {
  socket.send('Hello server!')
}, 1000)
const socket = new WebSocket(`ws://${window.location.host}`);

const chatList = document.querySelector('#chat-list');
const nicknameForm = document.querySelector('#nickname-form');
const messageForm = document.querySelector('#chat-form');

const makeMessage = (type, playload) => {
  return JSON.stringify({ type, playload });
};

socket.addEventListener('open', () => {
  console.log("Connected to the Server");
});

socket.addEventListener('close', () => {
  console.log("Disconnected From Server");
}); 

socket.addEventListener('message', (message) => {
  const li = document.createElement('li');
  li.innerText = message.data;
  chatList.append(li);
});

const handleSubmit = (e) => {
  e.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(makeMessage('new_message', input.value));
  input.value = '';
};
const handleNickSubmit = (e) => {
  e.preventDefault();
  const input = nicknameForm.querySelector('input');
  socket.send(makeMessage('nickname', input.value));
};

messageForm.addEventListener('submit', handleSubmit);
nicknameForm.addEventListener('submit', handleNickSubmit);

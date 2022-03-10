const socket = io();


const welcome = document.querySelector('#welcome');
const form = welcome.querySelector('form');

const withTimeout = (onSuccess, onTimeout, timeout = 3000) => {
  let called = false;

  const timer = setTimeout(() => {
    if(called) return;
    called = true;
    onTimeout();
  }, timeout);

  return (...args) => {
    if (called) return;
    called = true;
    clearTimeout(timer);
    onSuccess.apply(this, args);
  };
};

const handleRoomSubmit = (event) => {
  event.preventDefault();
  const input = form.querySelector('input');
  
  socket.emit("enter_room", { data: input.value }, withTimeout(({ status })=>{
    console.log("onSuccess! - status: ", status);
  }, () => {
    console.log('timeout!');
  }));
  
  // let count = 0;
  // setInterval(() => {
  //   socket.volatile.emit("ping", ++count);
  // }, 1000);

  input.value = '';
}
function backendDone(res) {
  console.log(`Hello~ ${res.msg}`);
};

form.addEventListener('submit', handleRoomSubmit);

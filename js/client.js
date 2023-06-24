const socket = io('http://localhost:3000', {
  transports: ['websocket']
});

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageIn');
const messageContainer = document.querySelector('.container');

var audio= new Audio('pop.mp3');

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if(position=='left'){
  audio.play();
  }
};


const data = prompt('Enter your name');
socket.emit('new-user-joined', data);

socket.on('user-joined', (data) => {
  append(`${data} joined the chat`, 'right');
});

socket.on('receive', (messageData) => {
  append(`${messageData.name}: ${messageData.message}`, 'left');
});

socket.on('left', (data) => {
    append(`${data} left the chat`, 'right');
  });

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
  });

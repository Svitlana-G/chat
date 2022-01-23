let socket = io();

let formUser = document.getElementById('userName');
let inputUser = document.getElementById('name');
let formMessages = document.getElementById('messagesForm');

let input = document.getElementById('message');
let messages = document.getElementById('allMessages');

let chat = document.getElementById('chat');
let sendBtn = document.getElementById('send');

let inputUserValue;
let inputMessageValue;

formUser.addEventListener('submit', function (e) {
    e.preventDefault();
    if (inputUser.value) {
        inputUserValue = inputUser.value;
        chat.style = "display:block";
        inputUser.style = "border-bottom: none";
        sendBtn.style = "border-bottom: none";
        input.focus()
    }
});

formMessages.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        inputMessageValue = input.value;
        socket.emit('user message', { user: inputUserValue, msg: inputMessageValue });
        input.value = '';
        input.focus()
    }

});

socket.on('user message', (obj) => {
    let item = document.createElement('div');
    item.textContent = obj.user + ": " + obj.message;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
})
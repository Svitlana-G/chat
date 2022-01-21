var socket = io();

var formUser = document.getElementById('userName');
var inputUser = document.getElementById('name');
var formMessages = document.getElementById('messagesForm');

var input = document.getElementById('message');
var messages = document.getElementById('allMessages');

let inputUserValue;
let inputMessageValue;

formUser.addEventListener('submit', function (e) {
    e.preventDefault();
    if (inputUser.value) {
        inputUserValue = inputUser.value;
        console.log('InputUserValue: ' + inputUserValue);
        alert('Name saved. You can write messages.');
    }
});

formMessages.addEventListener('submit', function (e) {
    e.preventDefault();
    if (inputUserValue != null) {
        if (input.value) {
            inputMessageValue = input.value;
            socket.emit('user message', { user: inputUserValue, msg: inputMessageValue });
            input.value = '';
            console.log('InputUserValue aus message: ' + inputUserValue);
        }
    } else {
        alert('Enter your name');
    }

});

socket.on('user message', (obj) => {
    var item = document.createElement('div');
    item.textContent = obj.user + ": " + obj.message;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
})
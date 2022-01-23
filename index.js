const express = require('express');
const { use } = require('express/lib/application');

const app = express();
app.use(express.static('public'));

const server = require('http').createServer(app);

const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT);

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname })
})


io.on('connection', (socket) => {
    console.log("Successful connection")


    socket.on('disconnect', data => {
        console.log("Successful disconnection")
    });

    socket.on('user message', (obj) => {
        console.log('user: ' + obj.user);
        console.log('message: ' + obj.msg);
        io.emit('user message', { user: obj.user, message: obj.msg });
    });

});


const express = require('express')

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

const PORT = 3001;
let connections = [];
let users = [];
server.listen(PORT);

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname })
})


io.on('connection', (socket) => {
    console.log("Successful connection")
    connections.push(socket);

    socket.on('disconnect', data => {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Successful disconnection")
    });

    socket.on('chat message', msg => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    })
});

// app.listen(app.get('PORT', () => console.log(`Express server listeinig on port ${PORT}`)))
// app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`))
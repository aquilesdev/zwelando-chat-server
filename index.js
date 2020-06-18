const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const dotenv = require('dotenv');

dotenv.config({path:'.env'});



const router = require('./router');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(router);

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (socket) => {

    console.log('A new user join the conversation');

    socket.on('join', ({name, room}, callback) =>{

        console.log(name, room);
    });


    socket.on('disconnect', () => {
        console.log('An user left the conversation');
    });
});

server.listen(PORT, console.log(`Server is running on port ${PORT}`));

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');

dotenv.config({path:'.env'});



const router = require('./router');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(router);

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (socket) => {

    socket.on('join', ({name, room}, callback) =>{

        const {error, user} = addUser({id:socket.id, name, room });

        if(error){
            callback(error);
            return;
        }

        socket.emit('message', {user: 'admin', text: `Welcome ${user.name}`});
        socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name} join the room`});

        callback();
    });

    //receive the message from the client and emit to others clients through the room
    socket.on('sendMessage', (message, callback) => {

        const user = getUser(socket.id);
        
        if(!user) {
            callback({error:'user not connected'})
            return;
        }
        io.to(user).emit('message', {user:user.name, text:message});

-       console.log(message);
        callback();

    });

    socket.on('disconnect', () => {
        console.log('An user left the conversation');
    });
});

server.listen(PORT, console.log(`Server is running on port ${PORT}`));

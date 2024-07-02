import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('new_user_login', (data) => {
        console.log('New user logged in', data.message);
        io.emit('new_user_login', { message: data.message });
    });
});

server.listen(5174, () => {
    console.log('Socket IO running at 5174');
});

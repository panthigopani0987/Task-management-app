const express = require('express');

const mongoose = require('mongoose');

const socketIo = require('socket.io');

const http = require('http');

const tasksRoutes = require('./routes/tasks');

const usersRoutes = require('./routes/users');

const cors = require('cors');

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = socketIo(server);

app.use(express.json());

app.use('/api/tasks', tasksRoutes);

app.use('/api/users', usersRoutes);

mongoose.connect('mongodb://localhost:27017/taskdb');

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('updateTask', (task) => {
        io.emit('taskUpdated', task);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});
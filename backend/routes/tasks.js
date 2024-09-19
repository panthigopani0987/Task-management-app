const express = require('express');

const routes = express.Router();

const Task = require('../models/Task');

const User = require('../models/User');

const admin = require('../firebase-admin');

//get post 
routes.get('/', async (req, res) => {
    try {
        const posts = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//create posts
routes.post('/', async (req, res) => {
    const { title, description } = req.body;

    try {
        const newPost = new Task({ title, description });
        await newPost.save();
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

routes.post('/assign-task/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        const { assignedTo } = req.body;

        const task = await Task.findByIdAndUpdate(taskId, { assignedTo }, { new: true });
        const user = await User.findById(assignedTo);

        const message = {
            notification: {
                title: 'Task Assigned',
                body: `You have been assigned a new task: ${task.title}`,
            },
            token: user.fcmToken,
        };

        await admin.messaging().send(message);

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

routes.post('/update-task/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;

        const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });

        if (task.assignedTo) {
            const user = await User.findById(task.assignedTo);
            const message = {
                notification: {
                    title: 'Task Status Updated',
                    body: `The status of your assigned task "${task.title}" has been updated to "${status}".`,
                },
                token: user.fcmToken,
            };

            await admin.messaging().send(message);
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = routes;
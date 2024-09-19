import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await axios.get('/api/tasks');
      setTasks(result.data);
    };
    fetchTasks();

    socket.on('taskUpdated', (task) => {
      setTasks((prevTasks) => prevTasks.map(t => t._id === task._id ? task : t));
    });

    return () => {
      socket.off('taskUpdated');
    };
  }, []);

  return (
    <div>
      {tasks.map(task => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

const fetchTasks = async () => {
  try {
    const result = await axios.get('http://localhost:3001/api/tasks');
    setTasks(result.data);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};


export default TaskList ;

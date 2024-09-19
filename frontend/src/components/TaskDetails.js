import React from 'react';
import axios from 'axios';

const TaskDetails = ({ task }) => {
  const assignTask = async (userId) => {
    try {
      await axios.post(`/api/tasks/assign-task/${task._id}`, { assignedTo: userId });
    } catch (error) {
      console.error('Error assigning task:', error);
    }
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <button onClick={() => assignTask('someUserId')}>Assign Task</button>
    </div>
  );
};

export default TaskDetails;

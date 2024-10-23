// src/components/TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');

    const addTask = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include Authorization header if you are using token-based authentication
                },
                body: JSON.stringify({ title }),
            });

            if (!response.ok) {
                throw new Error('Failed to create task');
            }

            const data = await response.json();
            onTaskAdded(data); // Update parent state with the new task
            setTitle(''); // Clear input field
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                required
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;

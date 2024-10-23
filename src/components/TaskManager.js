import React from 'react';

const TaskManager = ({ tasks, completeTask, newTask, setNewTask, handleAddTask }) => {
  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddTask}
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded">
          Add Task
        </button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center py-2">
            <span className={task.completed ? "line-through" : ""}>{task.description}</span>
            {!task.completed && (
              <button
                onClick={() => completeTask(index)}
                className="text-green-500 hover:underline">
                Complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css'; // TailwindCSS styles
import { getTasks, addTask } from './services/taskService';
import Login from './Login'; // Import your Login component
import Register from './Register'; // Import your Register component
import TaskManager from './TaskManager'; // Your existing task manager component

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    async function fetchTasks() {
      if (isLoggedIn) {
        const taskList = await getTasks();
        setTasks(taskList);
      }
    }
    fetchTasks();
  }, [isLoggedIn]); // Fetch tasks when login status changes

  const handleAddTask = async () => {
    const task = await addTask({ description: newTask });
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const completeTask = (index) => {
    let newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);

    // Update XP and level
    setXP(xp + 10);
    if (xp >= 100) {
      setLevel(level + 1);
      setXP(0);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
          <h1 className="text-2xl font-bold text-center mb-4">Productivity Tracker</h1>
          <Switch>
            <Route path="/login">
              <Login setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              {isLoggedIn ? (
                <>
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

                  <div className="mt-6">
                    <h2 className="text-lg font-semibold">XP: {xp}</h2>
                    <h2 className="text-lg font-semibold">Level: {level}</h2>
                  </div>
                </>
              ) : (
                <div>
                  <p className="text-center mb-4">Please log in to access your tasks.</p>
                  <a href="/login" className="text-blue-500">Login</a>
                </div>
              )}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

export const getTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks');
    return await response.json();
  };
  
  export const addTask = async (task) => {
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return await response.json();
  };
  
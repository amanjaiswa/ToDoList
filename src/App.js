import React, { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    // Load saved tasks from localStorage
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    // Save tasks to localStorage whenever tasks change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Aman kr Jaiswal </h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          style={{ width: "70%", padding: "8px", marginRight: "10px" }}
        />
        <button onClick={addTask} style={{ padding: "8px 15px" }}>
          Add
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <span
              onClick={() => toggleComplete(task.id)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: "10px", color: "red", border: "none", background: "none", cursor: "pointer" }}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

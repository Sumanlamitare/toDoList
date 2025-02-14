import "../App.css";
import { useState } from "react";

export default function Form({ dispatch }) {
  const [task, setTask] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (task.trim() === "") return;

    dispatch({ type: "addTask", payload: task });
    setTask("");
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        <h3>Enter Task Here</h3>

        <input
          className="input"
          type="text"
          placeholder="Task to add"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button className="submitBtn" style={{ marginLeft: "1em" }}>
          Add Task
        </button>
      </label>
    </form>
  );
}

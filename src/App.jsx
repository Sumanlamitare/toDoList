import { useEffect, useReducer, useState } from "react";
import Header from "./component/Header";
import Form from "./component/Form";

function addToList(state, action) {
  switch (action.type) {
    case "addTask":
      return [...state, { id: Date.now(), text: action.payload }];
    case "deleteTask":
      return state.filter((task) => task.id !== action.payload);
    case "edit_Task":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, text: action.payload.newText }
          : task
      );
    default:
      return state;
  }
}

function App() {
  const [tasks, dispatch] = useReducer(addToList, []);
  const [complete, setComplete] = useState({});
  const [editTask, setEditTask] = useState(""); // Initialize as empty string
  const [editID, setEditID] = useState(null);

  function handleEdit(task) {
    if (editTask.trim() === "") return; // Check if task is empty

    dispatch({
      type: "edit_Task",
      payload: { id: task.id, newText: editTask },
    });
    setEditTask(""); // Reset input
    setEditID(null); // Reset editing state
  }

  function handleCheckBoxChange(taskID) {
    setComplete((prev) => ({
      ...prev,
      [taskID]: !prev[taskID],
    }));
  }

  return (
    <>
      <Header />
      <Form dispatch={dispatch} />

      <div className="taskHolder">
        <ul className="list">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div className="tasksList" key={task.id}>
                <input
                  type="checkbox"
                  checked={complete[task.id] || false}
                  onChange={() => handleCheckBoxChange(task.id)}
                />

                {editID === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editTask}
                      onChange={(e) => setEditTask(e.target.value)}
                    />
                    <button onClick={() => handleEdit(task)}>Save</button>
                    <button onClick={() => setEditID(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <li>{task.text}</li>
                    <button
                      className="Editbtn"
                      onClick={() => {
                        setEditID(task.id);
                        setEditTask(task.text);
                      }}
                      disabled={complete[task.id]}
                      style={{
                        backgroundColor: !complete[task.id]
                          ? "limegreen"
                          : "gray",
                        cursor: !complete[task.id] ? "pointer" : "not-allowed",
                      }}
                    >
                      Edit
                    </button>
                  </>
                )}

                <button
                  className="Deletebtns"
                  onClick={() =>
                    dispatch({ type: "deleteTask", payload: task.id })
                  }
                  disabled={!complete[task.id]}
                  style={{
                    backgroundColor: complete[task.id] ? "red" : "gray",
                    cursor: complete[task.id] ? "pointer" : "not-allowed",
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No tasks yet!</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default App;

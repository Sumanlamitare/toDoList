import { useReducer, useState } from "react";
import Header from "./component/Header";
import Form from "./component/Form";

function addToList(state, action) {
  switch (action.type) {
    case "addTask":
      return [...state, { id: state.length + 1, text: action.payload }];
    default:
      return state;
  }
}
function App() {
  const [tasks, dispatch] = useReducer(addToList, []);

  return (
    <>
      <Header />
      <Form dispatch={dispatch} />
      <div className="taskHolder">
        <ul>
          {tasks.length > 0 ? (
            tasks.map((task) => <li key={task.id}>{task.text}</li>)
          ) : (
            <p>No tasks yet!</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default App;

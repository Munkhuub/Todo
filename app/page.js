"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  const handleAdd = () => {
    if (input.trim() !== "") {
      setItems([...items, input]); // Add the input value to the array
      setInput(""); // Clear the input field
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
  // const handleAdd = (event) => {
  //   console.log(input);
  // };

  return (
    <div className={styles.page}>
      <div className={styles.todo}>
        <h1>To-Do list</h1>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Хийх ажлаа бич..."
          />
          <button type="submit" onClick={handleAdd}>
            Add
          </button>
        </div>
        <div className={styles.buttons}>
          <button className={styles.all}>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
        <div className={styles.taskContainer}>
          {items.length > 0 ? (
            items.map((task, index) => (
              <div key={index} className={styles.task}>
                <input type="checkbox" disabled={task.completed} />
                {task}
                <button>Delete</button>
              </div>
            ))
          ) : (
            <p>No tasks yet. Add one above!</p>
          )}
        </div>
      </div>

      <div className={styles.poweredText}>
        <p>Powered by</p>
        <p className={styles.blue}>Pinecone academy</p>
      </div>
    </div>
  );
}
// arr.map yvna, shine array ruu pushleh
// export default function Home() {
//   const [count, setCount] = useState(0);
//   const [text, setText] = useState("");
//   const handleInc = () => {
//     setCount(count + 1);
//   };
//   const handleMinus = () => {
//     setCount(count - 1);
//   };
//   const handleInputChange = (event) => {
//     setText(event.target.value);
//   };

//   return (
//     <div className={styles.page} style={{ margin: "auto" }}>
//       <div>
//         <button onClick={handleInc}>Plus</button>

//         <button onClick={handleMinus}>Minus</button>

//         <p>Count: {count}</p>
//       </div>
//       <div>
//         <input type="text" onChange={handleInputChange} value={text}></input>
//         <div>{text.length}</div>
//       </div>
//     </div>
//   );
// }

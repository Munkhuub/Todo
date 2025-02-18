"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  const [buttonValue, setButtonValue] = useState("");

  const handleAdd = () => {
    if (input.trim() !== "") {
      setItems([...items, { text: input, isCompleted: false }]);
      setInput("");
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleCheckbox = (index) => {
    setItems((task) =>
      task.map((item, i) => {
        if (i === index) {
          return { ...item, isCompleted: !item.isCompleted };
        } else {
          return item;
        }
      })
    );
  };

  const handleDelete = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const filteredList = items.filter((item, index) => {
    if (buttonValue === "all") {
      return true;
    }
    if (buttonValue === "active") {
      return !item.isCompleted;
    }
    if (buttonValue === "completed") {
      return item.isCompleted;
    }
  });

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
          <button onClick={() => setButtonValue("all")} className={styles.all}>
            All
          </button>
          <button onClick={() => setButtonValue("active")}>Active</button>
          <button onClick={() => setButtonValue("completed")}>Completed</button>
        </div>
        <div className={styles.taskContainer}>
          {items.length > 0 ? (
            items.map((task, index) => (
              <div key={index} className={styles.task}>
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleCheckbox(index)}
                />
                <div
                  style={{
                    textDecoration:
                      task.isCompleted == true ? "line-through" : "",
                  }}
                >
                  {task.text}
                </div>
                <button onClick={() => handleDelete(index)}>Delete</button>
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

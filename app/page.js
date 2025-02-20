"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [buttonValue, setButtonValue] = useState("all");
  const [uid, setUid] = useState(0);
  const handleAdd = () => {
    if (input.trim() !== "") {
      setItems([...items, { text: input, isCompleted: false, id: uid }]);
      setInput("");
      setUid(uid + 1);
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleCheckbox = (id) => {
    const newItems = [...items];
    const index = newItems.findIndex((item) => item.id === id);
    newItems[index].isCompleted = !newItems[index].isCompleted;
    setItems(newItems);
  };

  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
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

  const checkedList = items.filter((item) => {
    if (item.isCompleted == true) {
      return true;
    }
  });
  const handleClearCompleted = () => {
    setItems((prev) => filteredList.filter((items) => !items.isCompleted));
  };
  // const taskCount = ({ items }) => {
  //   let number = 0;
  //   items.map((item) => {
  //     if (item.isCompleted === true) {
  //       return number++;
  //     }
  //     return number;
  //   });
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
          <button onClick={handleAdd}>Add</button>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={() => setButtonValue("all")}
            className={buttonValue === "all" ? styles.activeButton : ""}
          >
            All
          </button>
          <button
            onClick={() => setButtonValue("active")}
            className={buttonValue === "active" ? styles.activeButton : ""}
          >
            Active
          </button>
          <button
            onClick={() => setButtonValue("completed")}
            className={buttonValue === "completed" ? styles.activeButton : ""}
          >
            Completed
          </button>
        </div>
        <div className={styles.taskContainer}>
          {filteredList.length > 0 ? (
            filteredList.map((task, index) => (
              <div key={index} className={styles.task}>
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleCheckbox(task.id)}
                />
                <div
                  style={{
                    textDecoration:
                      task.isCompleted == true ? "line-through" : "",
                  }}
                >
                  {task.text}
                </div>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No tasks yet. Add one above!</p>
          )}
        </div>
        <div className={styles.line}></div>
        <div className={styles.trackTask}>
          <p className={styles.count}>
            {checkedList.length} out of {filteredList.length} tasks completed
          </p>
          <div onClick={handleClearCompleted}>Clear completed</div>
        </div>
      </div>

      <div className={styles.poweredText}>
        <p>Powered by</p>
        <p className={styles.blue}>Pinecone academy</p>
      </div>
    </div>
  );
}

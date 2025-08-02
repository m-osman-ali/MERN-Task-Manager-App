import { useState } from "react";
import "./App.css";
import { createTask, getAllTasks, DeleteTask, updateTask } from "./server.js";
import { useEffect } from "react";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [editTasks, setEditTasks] = useState(null);

  const editTask = () => {
    if (editTasks && input) {
      const updatedTask = {
        ...editTasks,
        taskName: input,
      };
      updateTasks(updatedTask);
      setEditTasks(null);
      setInput("");
    } else if (!editTasks && input) {
      addTask();
    }
  };

  useEffect(() => {
    if (editTasks) {
      setInput(editTasks.taskName);
    }
  }, [editTasks]);

  const addTask = async () => {
    const obj = {
      taskName: input,
      isDone: false,
    };

    try {
      const data = await createTask(obj);
      setInput("");
      fetchAllTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data.model);
      setCopyTasks(data.model);
    } catch (err) {
      console.error(err);
    }
  };

  const delTask = async (id) => {
    try {
      const data = await DeleteTask(id);
    } catch (err) {
      console.error(err);
    }
    fetchAllTasks();
  };

  const taskCom = async (item) => {
    const { _id, isDone, taskName } = item;
    const obj = {
      taskName,
      isDone: !isDone,
    };
    try {
      const data = await updateTask(_id, obj);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
    fetchAllTasks();
  };

  const updateTasks = async (item) => {
    // if (!item || !item._id) {
    //   console.error("Invalid task item:", item);
    //   return;
    // }

    const { _id, isDone, taskName } = item;

    const obj = {
      taskName,
      isDone: isDone,
    };

    try {
      const data = await updateTask(_id, obj);

      fetchAllTasks();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const searchTask = (e) => {
    const term = e.target.value.toLowerCase();
    const search = [...copyTasks];
    const results = search.filter((item) =>
      item.taskName.toLowerCase().includes(term)
    );
    setTasks(results);
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <>
      <div className="container mx-auto p-5 w-1/2 flex flex-col justify-center h-[85vh] items-center ">
        <h1 className="mb-5 text-xl font-bold font-sans-serif">
          Task Manager App
        </h1>
        <div className="inp flex justify-evenly items-center w-fit">
          <div className="input flex justify-center">
            <input
              id="input"
              name="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="border border-gray-300 rounded-2xl  py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-8 indent-4 mr-3"
            />
            <button
              onClick={editTask}
              className="bg-blue-600 w-18 h-8 rounded-2xl hover:bg-blue-700 text-white cursor-pointer"
            >
              Save
            </button>
          </div>
          <input
            onChange={searchTask}
            type="search"
            placeholder="search"
            className="border border-gray-600 rounded-2xl py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-8 indent-4"
          />
        </div>
        <div className="tasks min-h-1/2 max-h-auto my-5 flex justify-items-start w-full border-2 border-blue-600 rounded-2xl flex-col items-center overflow-y-scroll">
          {Array.isArray(tasks) &&
            tasks.map((item) => (
              <div
                key={item._id}
                className="flex w-fit my-3 bg-white rounded-2xl p-4 shadow items-start gap-4"
              >
                <div
                  className={`w-[200px] break-words overflow-visible max-h-24 text-sm font-sans-serif ${
                    item.isDone ? "line-through" : ""
                  }`}
                >
                  {item.taskName}
                </div>

                <div className="flex gap-2 justify-end flex-wrap">
                  <button
                    onClick={() => taskCom(item)}
                    className="bg-green-600 px-3 py-1 rounded-2xl hover:bg-green-700 text-white text-sm cursor-pointer"
                  >
                    Com
                  </button>
                  <button
                    onClick={() => setEditTasks(item)}
                    className="bg-blue-600 px-3 py-1 rounded-2xl hover:bg-blue-700 text-white text-sm cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => delTask(item._id)}
                    id={item._id}
                    className="bg-red-600 px-3 py-1 rounded-2xl hover:bg-red-700 text-white text-sm cursor-pointer"
                  >
                    Del
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;

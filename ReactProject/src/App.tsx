import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const value: string = "";

  const addTask = (taskMessage: string) => {
    setTasks([...tasks, taskMessage]);
    console.log(tasks);
  };

  const deleteTask = (index: number) => {
    setTasks([...tasks.slice(0, index), ...tasks.slice(index + 1)]);
  };

  const changeInput = () => {
    setInput(value);
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex flex-row gap-4 p-6">
        <input type="text" value={value} onChange={() => changeInput()} />
        <button
          onClick={() => addTask(input)}
          aria-placeholder="Type something..."
          className="bg-green-600 p-3 m-1 font-sans text-white rounded-xl"
        >
          addTask
        </button>
      </div>

      <ul>
        {tasks.map((task: string, index: number) => {
          return (
            <li
              key={index}
              className="font-sans bg-slate-600 text-white p-3 m-1 rounded-xl"
              onClick={() => deleteTask(index)}
            >
              {task}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;

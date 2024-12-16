import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Type anything..."
        onChange={() => setInput}
      />
    </div>
  );
}

export default App;

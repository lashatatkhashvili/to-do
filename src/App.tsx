import React, { useState } from "react";
import ToDoItem from "./components/ToDoItem";

export interface IToDo {
  id: number;
  title: string;
  completed: boolean;
  editing: boolean;
}

const App: React.FC = () => {
  const [toDos, setToDos] = useState<IToDo[]>([]);
  const [title, setTitle] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAddTodo = () => {
    if (title.trim() === "") return;

    const newTodo: IToDo = {
      id: Date.now(),
      title,
      completed: false,
      editing: false,
    };

    setToDos([...toDos, newTodo]);
    setTitle("");
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[500px] flex flex-col items-center mt-8">
        <h1 className="text-3xl font-bold mb-6">To Do App</h1>

        <div className="w-full flex mb-4">
          <input
            type="text"
            value={title}
            onChange={handleInputChange}
            placeholder="New to do"
            className="w-[80%] border border-gray-400 rounded px-2 py-1 mr-2"
          />
          <button
            onClick={handleAddTodo}
            className="w-[20%] bg-gray-500 text-white rounded px-4 py-1"
          >
            Add
          </button>
        </div>

        <ul className="w-full">
          {toDos.map((toDo) => (
            <ToDoItem
              key={toDo.id}
              toDo={toDo}
              toDos={toDos}
              setToDos={setToDos}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

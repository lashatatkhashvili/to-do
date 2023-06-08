import React, { useState, Dispatch, SetStateAction } from "react";
import { IToDo } from "../App";

interface IToDoItem {
  toDo: IToDo;
  toDos: IToDo[];
  setToDos: Dispatch<SetStateAction<IToDo[]>>;
}

const ToDoItem: React.FC<IToDoItem> = ({ toDo, toDos, setToDos }) => {
  const [editedToDo, setEditedToDo] = useState<string>("");

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedToDo(e.target.value);
  };

  const handleToggleTodo = (id: number) => {
    const updatedToDos = toDos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    setToDos(updatedToDos);
  };

  const handleEditTodo = (e: React.MouseEvent<HTMLElement>, id: number) => {
    e.stopPropagation();
    const updatedToDos = toDos.map((todo) => {
      if (todo.id === id) {
        setEditedToDo(todo.title);
        return {
          ...todo,
          editing: true,
        };
      }
      return todo;
    });

    setToDos(updatedToDos);
  };

  const handleSaveTodo = (id: number, newTitle: string) => {
    const updatedToDos = toDos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: newTitle,
          editing: false,
        };
      }
      return todo;
    });

    setToDos(updatedToDos);
  };

  const handleCancelEdit = (id: number) => {
    const updatedToDos = toDos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          editing: false,
        };
      }
      return todo;
    });

    setEditedToDo("");
    setToDos(updatedToDos);
  };

  const handleRemoveTodo = (e: React.MouseEvent<HTMLElement>, id: number) => {
    e.stopPropagation();
    const updatedToDos = toDos.filter((todo) => todo.id !== id);
    setToDos(updatedToDos);
  };

  return (
    <li
      className={`w-full flex items-center justify-between p-2 mb-2 border ${
        toDo.completed ? "border-green-400" : "border-gray-400"
      }`}
    >
      {toDo.editing ? (
        <>
          <input
            type="text"
            value={editedToDo}
            onChange={(e) => handleEditInputChange(e)}
            className="border border-gray-400 rounded px-2 py-1 mr-2"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSaveTodo(toDo.id, editedToDo)}
              className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-1"
            >
              Save
            </button>
            <button
              onClick={() => handleCancelEdit(toDo.id)}
              className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-1"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div
          className="w-full flex items-center justify-between cursor-pointer"
          onClick={() => handleToggleTodo(toDo.id)}
        >
          <span
            className={`cursor-pointer select-none ${
              toDo.completed ? "line-through text-green-400" : ""
            }`}
          >
            {toDo.title}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => handleEditTodo(e, toDo.id)}
              className="text-blue-500 hover:text-blue-600 mx-2 select-none"
            >
              Edit
            </button>
            <button
              onClick={(e) => handleRemoveTodo(e, toDo.id)}
              className="text-red-500 hover:text-red-600 select-none"
            >
              X
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default ToDoItem;

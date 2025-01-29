import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, SetTodo] = useState("");
  const [todos, SetTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      SetTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    SetTodo(e.target.value);
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;
    SetTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    SetTodo("");
  };

  const handleCheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    if (index === -1) return;
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    SetTodos(newTodos);
  };

  const handleEdit = (id) => {
    let t = todos.find((item) => item.id === id);
    if (!t) return;
    SetTodo(t.todo);
    SetTodos(todos.filter((item) => item.id !== id));
  };

  const handleDelete = (id) => {
    SetTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-500">
      <h2 className="text-white text-3xl sm:text-4xl mb-6">To-Do List</h2>
      <div className="bg-white max-w-lg w-full p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            onChange={handleChange}
            value={todo}
            className="p-3 bg-amber-200 rounded-xl w-full sm:w-auto flex-1"
            type="text"
            placeholder="Add your todo here"
          />
          <button
            onClick={handleAdd}
            className="rounded-xl bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        {todos.length === 0 && (
          <div className="flex items-center justify-center mt-6 text-gray-500">
            No todos added!!
          </div>
        )}

        <div className="mt-6 space-y-4">
          {todos.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-xl shadow-sm"
            >
              <div className="flex gap-3 items-center">
                <input
                  onChange={handleCheck}
                  name={item.id}
                  checked={item.isCompleted}
                  type="checkbox"
                  className="cursor-pointer"
                />
                <div className={item.isCompleted ? "line-through text-gray-400" : ""}>{item.todo}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="rounded-xl bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-xl bg-red-500 px-3 py-1 text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

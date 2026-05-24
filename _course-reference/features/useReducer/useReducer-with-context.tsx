import { createContext, useContext, useReducer, useState } from "react";

// Types
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoAction =
  | { type: "ADD_TODO"; text: string }
  | { type: "TOGGLE_TODO"; id: number }
  | { type: "DELETE_TODO"; id: number };

// Context
const TodoContext = createContext<{
  todos: Todo[];
  dispatch: React.Dispatch<TodoAction>; // The dispatch function is used to send actions to the reducer, 
  // which will update the state of the todos based on the action type and payload.
} | null>(null);

// Reducer
function todoReducer(state: Todo[], action: TodoAction): Todo[] { // The reducer function takes the current state of the todos and an action,

  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.text,
          completed: false,
        },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}

// Components
function TodoList() {
  const { todos, dispatch } = useContext(TodoContext)!;

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center gap-2 p-2 bg-gray-100 rounded"
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch({ type: "TOGGLE_TODO", id: todo.id })}
            className="h-4 w-4"
          />
          <span
            className={`flex-1 text-gray-800 ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.text}
          </span>
          <button
            onClick={() => dispatch({ type: "DELETE_TODO", id: todo.id })}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

function AddTodo() {
  const { dispatch } = useContext(TodoContext)!;
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: "ADD_TODO", text: text.trim() });
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1 p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
}

export default function Home() {
  const [todos, dispatch] = useReducer(todoReducer, []); // The useReducer hook is used to manage the state of the todos,
  // with the todoReducer function handling the logic for updating the state based on dispatched actions. 
  // The initial state of the todos is an empty array.

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Todo List</h1>
        <TodoContext.Provider value={{ todos, dispatch }}>
          <AddTodo />
          <TodoList />
        </TodoContext.Provider>
      </div>
    </div>
  );
}

// USECALLBACK FAST REFERENCE
//
// USE THIS WHEN:
// - a parent passes a function to a child component
// - the child is memoized with React.memo
// - you want the child to avoid unnecessary re-renders
//
// MEMORY:
// useMemo returns a value.
// useCallback returns a function.

import { memo, useCallback, useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
};

const TodoItem = memo(function TodoItem({ todo, onToggle }: TodoItemProps) {
  return (
    <li className="flex gap-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={todo.completed ? "line-through" : ""}>{todo.text}</span>
    </li>
  );
});

export default function UseCallbackExample() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Revise hooks", completed: false },
    { id: 2, text: "Practise form validation", completed: false },
  ]);
  const [counter, setCounter] = useState(0);

  const handleToggle = useCallback((id: number) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  return (
    <main className="space-y-4 p-6">
      <button
        type="button"
        onClick={() => setCounter((current) => current + 1)}
        className="rounded bg-blue-700 px-4 py-2 text-white"
      >
        Counter: {counter}
      </button>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
        ))}
      </ul>
    </main>
  );
}


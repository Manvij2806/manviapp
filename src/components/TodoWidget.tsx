import { useState } from 'react';
import { Check, Plus, X, ListTodo } from 'lucide-react';

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

const TodoWidget = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: 'Complete DAA assignment', completed: false },
    { id: 2, text: 'Review VLSI notes', completed: false },
    { id: 3, text: 'Submit lab report', completed: true },
    { id: 4, text: 'Prepare for seminar', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
      setIsAdding(false);
    }
  };

  const pendingCount = todos.filter(t => !t.completed).length;

  return (
    <div className="dashboard-card h-full flex flex-col">
      <div className="card-header flex items-center justify-between">
        <div className="flex items-center gap-1">
          <ListTodo className="w-3 h-3 text-todo" />
          <span>TO-DO LIST</span>
        </div>
        <span className="text-todo text-[10px] font-bold">{pendingCount} pending</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 pr-1">
        {todos.map((todo, index) => (
          <div
            key={todo.id}
            className="todo-item group animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`todo-checkbox flex items-center justify-center transition-all ${
                todo.completed ? 'bg-todo border-todo' : 'hover:border-todo/60'
              }`}
            >
              {todo.completed && <Check className="w-2 h-2 text-background" />}
            </button>
            <span
              className={`flex-1 truncate transition-all ${
                todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:text-accent"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {isAdding ? (
        <div className="mt-1 pt-1 border-t border-border flex gap-1">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="New task..."
            autoFocus
            className="flex-1 bg-muted text-[10px] px-2 py-1 rounded outline-none focus:ring-1 ring-todo"
          />
          <button
            onClick={addTodo}
            className="p-1 bg-todo rounded text-background hover:opacity-80"
          >
            <Check className="w-3 h-3" />
          </button>
          <button
            onClick={() => { setIsAdding(false); setNewTodo(''); }}
            className="p-1 bg-muted rounded hover:bg-accent"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-1 pt-1 border-t border-border flex items-center gap-1 text-[10px] text-muted-foreground hover:text-todo transition-colors"
        >
          <Plus className="w-3 h-3" />
          Add task
        </button>
      )}
    </div>
  );
};

export default TodoWidget;

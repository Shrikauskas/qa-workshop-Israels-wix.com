import { useEffect, useState } from 'react'
import './App.css'

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

const translations: Record<number, string> = {
  1: 'Choose and enjoy something',
  2: 'Find out who makes tasks easy and official',
  3: 'Avoid getting less forgiveness',
  4: 'Handle timing and delays',
  5: 'Work through the hard stuff to gain what you need',
  6: 'Figure out who has reason for all pleasures',
  7: 'Speed up what follows because of the cause',
  8: 'Gain more than what you started with',
  9: 'Deal with annoying insights',
  10: 'Accept that reason and grief come from greater things',
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((res) => res.json())
      .then((data: Todo[]) => {
        const translated = data.map((todo) => ({
          ...todo,
          title: translations[todo.id] ?? todo.title,
        }))
        setTodos(translated)
        setLoading(false)
      })
  }, [])

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  if (loading) {
    return (
      <div data-testid="loading-state">
        <h1 data-testid="app-title">QA Workshop</h1>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div data-testid="app-container">
      <h1 data-testid="app-title">QA Workshop</h1>
      <ul data-testid="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} data-testid={`todo-item-${todo.id}`}>
            <label data-testid={`todo-label-${todo.id}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                data-testid={`todo-checkbox-${todo.id}`}
              />
              <span data-testid={`todo-title-${todo.id}`}>{todo.title}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

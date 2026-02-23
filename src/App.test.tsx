import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from './App'

const mockTodos = Array.from({ length: 10 }, (_, i) => ({
  userId: 1,
  id: i + 1,
  title: `Todo item ${i + 1}`,
  completed: i % 2 === 0,
}))

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(mockTodos),
    } as Response)
  })

  it('shows a loading state before todos are loaded', async () => {
    render(<App />)
    expect(screen.getByTestId('loading-state')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByTestId('todo-list')).toBeInTheDocument()
    })
  })

  it('renders 10 todo items after loading', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('todo-list')).toBeInTheDocument()
    })

    for (let i = 1; i <= 10; i++) {
      expect(screen.getByTestId(`todo-item-${i}`)).toBeInTheDocument()
    }
  })

  it('renders a checkbox for each todo item with correct data-testid', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('todo-list')).toBeInTheDocument()
    })

    for (let i = 1; i <= 10; i++) {
      const checkbox = screen.getByTestId(`todo-checkbox-${i}`)
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).toHaveAttribute('type', 'checkbox')
    }
  })

  it('reflects the correct initial checked state from the API', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('todo-list')).toBeInTheDocument()
    })

    for (const todo of mockTodos) {
      const checkbox = screen.getByTestId(`todo-checkbox-${todo.id}`)
      if (todo.completed) {
        expect(checkbox).toBeChecked()
      } else {
        expect(checkbox).not.toBeChecked()
      }
    }
  })

  it('renders a title span with data-testid for each todo', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('todo-list')).toBeInTheDocument()
    })

    for (let i = 1; i <= 10; i++) {
      const title = screen.getByTestId(`todo-title-${i}`)
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent(`Todo item ${i}`)
    }
  })
})

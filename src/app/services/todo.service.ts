import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private storageKey = 'modern-todos';

  getTodos(): Todo[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }

  getTodoById(id: string): Todo | undefined {
    return this.getTodos().find(todo => todo.id === id);
  }

  addTodo(todo: Omit<Todo, 'id'>): void {
    const todos = this.getTodos();
    todos.push({ ...todo, id: crypto.randomUUID() });
    this.saveTodos(todos);
  }

  updateTodo(updatedTodo: Todo): void {
    const todos = this.getTodos().map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    this.saveTodos(todos);
  }

  deleteTodo(id: string): void {
    const todos = this.getTodos().filter(todo => todo.id !== id);
    this.saveTodos(todos);
  }
}
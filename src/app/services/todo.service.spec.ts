import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { Todo } from '../models/todo.model';

describe('TodoService', () => {
  let service: TodoService;

  // Mock localStorage
  const mockStorage: { [key: string]: string } = {};
  const localStorageMock = {
    getItem: (key: string) => mockStorage[key] || null,
    setItem: (key: string, value: string) => (mockStorage[key] = value),
    removeItem: (key: string) => delete mockStorage[key],
    clear: () => {
      for (const key in mockStorage) {
        delete mockStorage[key];
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);

    // Remplacer localStorage par le mock
    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(localStorageMock.removeItem);
    spyOn(localStorage, 'clear').and.callFake(localStorageMock.clear);

    localStorageMock.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTodos should return empty array if nothing stored', () => {
    expect(service.getTodos()).toEqual([]);
  });

  it('saveTodos should store todos in localStorage', () => {
    const todos: Todo[] = [
      { id: '1', title: 'Test', description: '', dueDate: '', priority: 'medium', completed: false }
    ];
    service.saveTodos(todos);
    expect(localStorage.setItem).toHaveBeenCalledWith(service['storageKey'], JSON.stringify(todos));
  });

  it('getTodoById should find todo by id', () => {
    const todos: Todo[] = [
      { id: '123', title: 'Find me', description: '', dueDate: '', priority: 'medium', completed: false }
    ];
    service.saveTodos(todos);
    expect(service.getTodoById('123')).toEqual(todos[0]);
    expect(service.getTodoById('999')).toBeUndefined();
  });

  it('addTodo should add a todo with generated id', () => {
    service.addTodo({
      title: 'New task',
      description: 'Desc',
      dueDate: '2025-05-20',
      priority: 'high',
      completed: false
    });
    const todos = service.getTodos();
    expect(todos.length).toBe(1);
    expect(todos[0].id).toBeDefined();
    expect(todos[0].title).toBe('New task');
  });

  it('updateTodo should update an existing todo', () => {
    const todo: Todo = {
      id: 'abc',
      title: 'Old title',
      description: '',
      dueDate: '',
      priority: 'low',
      completed: false
    };
    service.saveTodos([todo]);

    const updated: Todo = { ...todo, title: 'Updated title' };
    service.updateTodo(updated);

    const todos = service.getTodos();
    expect(todos.length).toBe(1);
    expect(todos[0].title).toBe('Updated title');
  });

  it('deleteTodo should remove a todo by id', () => {
    const todo1: Todo = { id: '1', title: 'Task 1', description: '', dueDate: '', priority: 'medium', completed: false };
    const todo2: Todo = { id: '2', title: 'Task 2', description: '', dueDate: '', priority: 'high', completed: false };
    service.saveTodos([todo1, todo2]);

    service.deleteTodo('1');

    const todos = service.getTodos();
    expect(todos.length).toBe(1);
    expect(todos[0].id).toBe('2');
  });
});

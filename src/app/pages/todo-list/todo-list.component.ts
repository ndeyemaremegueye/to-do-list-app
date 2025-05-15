import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  todos: Todo[] = this.todoService.getTodos();
  priorities = ['low', 'medium', 'high'];

  constructor(private todoService: TodoService) {}

  toggleComplete(id: string): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.todoService.updateTodo(todo);
    }
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
    this.todos = this.todoService.getTodos();
  }
}
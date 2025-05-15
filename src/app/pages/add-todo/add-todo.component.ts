import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { CommonModule } from '@angular/common';

@Component({
  //imports : [CommonModule, RouterModule],
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  newTodo: Omit<Todo, 'id'> = {
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium',
    completed: false
  };

  constructor(
    private todoService: TodoService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.newTodo.title.trim()) {
      this.todoService.addTodo(this.newTodo);
      this.router.navigate(['/']);
    }
  }
}
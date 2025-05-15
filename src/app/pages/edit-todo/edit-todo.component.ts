import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {
  todo!: Todo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const foundTodo = this.todoService.getTodoById(id);
      if (foundTodo) {
        this.todo = { ...foundTodo };
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  onSave(): void {
    this.todoService.updateTodo(this.todo);
    this.router.navigate(['/']);
  }
}
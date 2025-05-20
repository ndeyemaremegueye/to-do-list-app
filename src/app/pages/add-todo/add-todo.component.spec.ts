import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTodoComponent } from './add-todo.component';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  let todoServiceMock: jasmine.SpyObj<TodoService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Création des mocks avec spy sur addTodo et navigate
    todoServiceMock = jasmine.createSpyObj('TodoService', ['addTodo']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AddTodoComponent],
      imports: [FormsModule], // nécessaire pour ngModel
      providers: [
        { provide: TodoService, useValue: todoServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component with default newTodo values', () => {
    expect(component).toBeTruthy();
    expect(component.newTodo.title).toBe('');
    expect(component.newTodo.description).toBe('');
    expect(component.newTodo.priority).toBe('medium');
    expect(component.newTodo.completed).toBeFalse();
    // Vérifie que dueDate est bien une string date au format YYYY-MM-DD
    expect(component.newTodo.dueDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('should NOT add todo or navigate if title is empty or whitespace', () => {
    component.newTodo.title = '   ';
    component.onSubmit();

    expect(todoServiceMock.addTodo).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should add todo and navigate to home on valid title', () => {
    component.newTodo.title = 'New Task';
    component.onSubmit();

    expect(todoServiceMock.addTodo).toHaveBeenCalledWith(component.newTodo);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});

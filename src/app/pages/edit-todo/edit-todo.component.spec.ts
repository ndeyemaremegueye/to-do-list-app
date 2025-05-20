import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTodoComponent } from './edit-todo.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { of } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { FormsModule } from '@angular/forms';

describe('EditTodoComponent', () => {
  let component: EditTodoComponent;
  let fixture: ComponentFixture<EditTodoComponent>;
  let todoServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    todoServiceMock = {
      getTodoById: jasmine.createSpy('getTodoById').and.returnValue({
        id: '123',
        title: 'Test Todo',
        description: 'Test description',
        dueDate: '',
        priority: 'medium',
      }),
      updateTodo: jasmine.createSpy('updateTodo')
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [EditTodoComponent],
      imports: [FormsModule],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '123'  // Id simulée pour le test
              }
            }
          }
        },
        { provide: Router, useValue: routerMock },
        { provide: TodoService, useValue: todoServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load todo', () => {
    expect(component).toBeTruthy();
    expect(todoServiceMock.getTodoById).toHaveBeenCalledWith('123');
    expect(component.todo.title).toBe('Test Todo');
  });

  it('should save todo and navigate to home', () => {
    component.onSave();
    expect(todoServiceMock.updateTodo).toHaveBeenCalledWith(component.todo);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});

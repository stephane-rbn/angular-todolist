import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoItem } from '../../models/TodoItem';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todoItem: TodoItem;
  @Output() deleteTodoEvent: EventEmitter<TodoItem> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  // Set dynamic classes
  setClasses() {
    return {
      todo: true,
      'is-complete': this.todoItem.completed,
    };
  }

  onToggle(todoItem) {
    // Toggle in UI
    todoItem.completed = !todoItem.completed;
    // Toggle on server
    this.todoService.toggleCompleted(todoItem).subscribe((modifiedTodoItem) => console.log(modifiedTodoItem));
  }

  onDelete(todoItem) {
    this.deleteTodoEvent.emit(todoItem);
  }
}

import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../../models/TodoItem';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoList: TodoItem[];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe((todos) => this.todoList = todos);
  }

  deleteTodo(todoItem: TodoItem) {
    // Remove from UI
    this.todoList = this.todoList.filter((t) => t.id !== todoItem.id);
    // Remove from server
    this.todoService.deleteTodo(todoItem).subscribe();
  }

  addTodo(todoItem: TodoItem) {
    this.todoService.addTodo(todoItem).subscribe((t) => {
      // Overwrite ID to be unique
      t.id = Date.now();
      this.todoList.push(t);
    });
  }

}

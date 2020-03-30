import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TodoItem } from '../models/TodoItem';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosUrl = 'http://jsonplaceholder.typicode.com/todos';
  limit = '?_limit=5';

  constructor(private http: HttpClient) { }

  // Get all todo items
  getAllTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(`${this.todosUrl}${this.limit}`);
  }

  // Delete todo item
  deleteTodo(todoItem: TodoItem): Observable<TodoItem> {
    const url = `${this.todosUrl}/${todoItem.id}`;
    return this.http.delete<TodoItem>(url, httpOptions);
  }

  // Add todo item
  addTodo(todoItem: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.todosUrl, todoItem, httpOptions);
  }

  // Toggle completed
  toggleCompleted(todoItem: TodoItem): Observable<any> {
    const url = `${this.todosUrl}/${todoItem.id}`;
    return this.http.put(url, todoItem, httpOptions);
  }
}

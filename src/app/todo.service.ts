import { Injectable } from '@angular/core';
import {Todo, TodoDb} from './todo';
import uuidv4 from 'uuid/v4';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private db: TodoDb;

  constructor() {
    this.db = new TodoDb();
  }

  async getTodos(): Promise<Todo[]> {
    return this.db.todos.where('ts').notEqual(-1).toArray();
  }

  getTodo(id: string): Promise<Todo> {
    return this.db.todos.get(id);
  }

  deleteTodo(todo: Todo) {
    todo.ts = -1;
    this.db.todos.put(todo).then(() => this.requestSync());
  }

  processRequest(request) {
    request.id = uuidv4();
    request.ts = 0;
    this.db.todos.add(request).then(() => this.requestSync());
  }

  requestSync() {
    navigator.serviceWorker.ready.then(swRegistration => swRegistration.sync.register('todo_updated'));
  }

  // private changed(oldTodo: Todo, newTodo: Todo) {
  //   if (oldTodo.subject !== newTodo.subject) {
  //     return true;
  //   }
  //   if (oldTodo.description !== newTodo.description) {
  //     return true;
  //   }
  //   return false;
  // }
}

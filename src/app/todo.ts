import Dexie from 'dexie';

export class TodoDb extends Dexie {
  todos: Dexie.Table<Todo, string>;

  constructor() {
    super('Todo');
    this.version(1).stores({
      todos: 'id, ts',
    });
  }
}

export interface Todo {
  id: string;
  url: string;
  method: string;
  content: string;
  ts: number;
}

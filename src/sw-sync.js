(function () {
  'use strict';

  importScripts('dexie.min.js');

  const db = new Dexie("Todo");

  db.version(1).stores({
    todos: "id, ts"
  });
  db.open();

  self.addEventListener('sync', function (event) {
    if (event.tag === 'todo_updated') {
      event.waitUntil(serverSync());
    }
  });

  async function serverSync() {
    await db.todos.toCollection().each(todo => {
      sendRequest(todo);
    })
  }

  async function sendRequest(request) {
      const syncResponse = await fetch(request.url, {
        method: request.method,
        body: JSON.stringify(request.content),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (syncResponse.status === 200) {
        await db.todos.where("id").equals(request.id).delete();
        window.alert("Envío exitoso");
      }
  }

}());

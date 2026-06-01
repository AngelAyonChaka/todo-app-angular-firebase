import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { db } from '../firebase';

import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class TodoService {

  // 📖 Obtener todas las tareas (tiempo real)
  getTodos(): Observable<Todo[]> {
    return new Observable<Todo[]>(observer => {
      const ref = collection(db, 'todos');
      const unsubscribe = onSnapshot(ref, snapshot => {
        const todos: Todo[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Todo[];
        observer.next(todos);
      }, error => {
        observer.error(error);
      });

      // Cleanup cuando se desuscriba
      return () => unsubscribe();
    });
  }

  // ➕ Agregar
  addTodo(title: string) {
    const ref = collection(db, 'todos');
    return addDoc(ref, {
      title,
      completed: false,
      createdAt: new Date()
    });
  }

  // ✅ Toggle completado
  toggleTodo(todo: Todo) {
    const ref = doc(db, 'todos', todo.id!);
    return updateDoc(ref, { completed: !todo.completed });
  }

  // ✏️ Editar
  updateTodo(id: string, title: string) {
    const ref = doc(db, 'todos', id);
    return updateDoc(ref, { title });
  }

  // 🗑️ Eliminar
  deleteTodo(id: string) {
    const ref = doc(db, 'todos', id);
    return deleteDoc(ref);
  }
}
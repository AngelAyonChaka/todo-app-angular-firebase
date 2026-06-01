import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.css']
})
export class TodoListComponent implements OnInit {
  private todoService = inject(TodoService);

  todos$!: Observable<Todo[]>;
  newTodoTitle = '';
  editingId: string | null = null;
  editingTitle = '';

  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos();
  }

  addTodo(): void {
    const title = this.newTodoTitle.trim();
    if (title) {
      this.todoService.addTodo(title);
      this.newTodoTitle = '';
    }
  }

  toggleTodo(todo: Todo): void {
    this.todoService.toggleTodo(todo);
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
  }

  startEdit(todo: Todo): void {
    this.editingId = todo.id!;
    this.editingTitle = todo.title;
  }

  saveEdit(): void {
    const title = this.editingTitle.trim();
    if (title && this.editingId) {
      this.todoService.updateTodo(this.editingId, title);
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editingTitle = '';
  }
}
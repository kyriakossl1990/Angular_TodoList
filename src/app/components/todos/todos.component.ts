import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo'
import { TodoService } from '../../services/todo.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos:Todo[] ;

  constructor(private _todoService:TodoService) { }

  ngOnInit() {
    this._todoService.getTodos().subscribe(todos =>{
      this.todos = todos;
    });
  }

  deleteTodo(todo:Todo){
    // Remove from UI
    this.todos = this.todos.filter(t => t.id != todo.id);
    // Remove from server
    this._todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo:Todo){
    this._todoService.addTodo(todo).subscribe(todo => {
    this.todos.push(todo);
  });
  }
}

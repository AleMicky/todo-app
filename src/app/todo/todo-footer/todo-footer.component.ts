import { Component, OnInit } from '@angular/core';
import  * as fromFiltro from '../../filter/filter.actions';
import * as fromTodo from '../todo.action';
import {Store} from '@ngrx/store';
import {AppState} from '../../app-reducer';
import {Todo} from '../model/todo.model';
@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  filtroValido: fromFiltro.filtroValidos[] = ['todos','completados','pendientes']
  filroActual: fromFiltro.filtroValidos;
  pendiente: number;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state =>{
      this.contarPendiente(state.todos);
      this.filroActual = state.filtro;
    });

  }
  cambiarEstado(nuevoFiltro: fromFiltro.filtroValidos){
    const accion = new fromFiltro.SetFiltroAction(nuevoFiltro);
    this.store.dispatch(accion);
  }
  contarPendiente(todos: Todo[]){
    this.pendiente = todos.filter(todo => !todo.completado).length;
  }
  borrarAll(){
    const accion = new fromTodo.BorrarAllTodoAction();
    this.store.dispatch(accion);
  }
}

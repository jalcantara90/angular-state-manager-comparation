import { Injectable } from '@angular/core';
import { TaskFacadeInterface } from '../task/task-facade.interface';
import { Observable } from 'rxjs';
import { Task } from '../task/task.model';
import { TaskAkitaStoreService } from './task-akita-store.service';

@Injectable({
  providedIn: 'root'
})
export class TaskAkitaStoreFacadeService implements TaskFacadeInterface {

  taskList$: Observable<Task[]> = this.taskAkitaStoreSerice.taskList$;
  constructor(private taskAkitaStoreSerice: TaskAkitaStoreService) { }

  getTask() {
    this.taskAkitaStoreSerice.getTask();
  }

  showAll() {
    this.taskAkitaStoreSerice.showAll();
  }

  showCompleted() {
    this.taskAkitaStoreSerice.showCompleted();
  }

  showPending() {
    this.taskAkitaStoreSerice.showPending();
  }
  addToTop(task: Task) {
    this.taskAkitaStoreSerice.addTask(task);
  }
  updateTask(task: Task) {
    this.taskAkitaStoreSerice.updateTask(task);
  }

  deleteTask(taskId: string) {
    this.taskAkitaStoreSerice.removeTask(taskId);
  }
}

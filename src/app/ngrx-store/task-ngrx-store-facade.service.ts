import { Injectable } from '@angular/core';
import { TaskFacadeInterface } from '../task/task-facade.interface';
import { Observable } from 'rxjs';
import { Task } from '../task/task.model';
import { TaskNgrxStoreService } from './task-ngrx-store.service';

@Injectable({
  providedIn: 'root'
})
export class TaskNgrxStoreFacadeService implements TaskFacadeInterface {

  constructor(private taskNgrxStoreService: TaskNgrxStoreService) { }

  taskList$: Observable<Task[]> = this.taskNgrxStoreService.taskList$;

  getTask() {
    this.taskNgrxStoreService.getTask();
  }

  showAll() {
    this.taskNgrxStoreService.showAll();
  }

  showCompleted() {
    this.taskNgrxStoreService.showCompleted();
  }

  showPending() {
    this.taskNgrxStoreService.showPending();
  }

  addToTop(task: Task) {
    this.taskNgrxStoreService.addTask(task);
  }

  updateTask(task: Task) {
    this.taskNgrxStoreService.updateTask(task);
  }

  deleteTask(taskId: string) {
    this.taskNgrxStoreService.deleteTask(taskId);
  }
}

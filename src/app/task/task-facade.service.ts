import { Injectable } from '@angular/core';
import { TaskStateRxjsService } from './task-state-rxjs/task-state-rxjs.service';
import { Task } from './task.model';
import { TaskFacadeInterface } from './task-facade.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskFacadeService implements TaskFacadeInterface {
  taskList$ = this.rxjsService.taskList$;

  constructor(private rxjsService: TaskStateRxjsService) { }

  showAll() {
    this.rxjsService.showAll();
  }

  showCompleted() {
    this.rxjsService.showCompleted();
  }

  showPending() {
    this.rxjsService.showPending();
  }

  addToTop(task: Task) {
    this.rxjsService.addToTop(task);
  }

  updateTask(taskId: string) {
    this.rxjsService.updateStatusTask(taskId);
  }

  deleteTask(taskId: string) {
    this.rxjsService.deleteTask(taskId);
  }

}

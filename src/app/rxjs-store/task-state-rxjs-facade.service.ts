import { Injectable } from '@angular/core';
import { TaskStateRxjsService } from './task-state-rxjs.service';
import { Task } from '../task/task.model';
import { TaskFacadeInterface } from '../shared/task-facade.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskFacadeService implements TaskFacadeInterface {
  taskList$ = this.rxjsService.taskList$;

  constructor(private rxjsService: TaskStateRxjsService) { }

  getTask() {
    this.rxjsService.getTask();
  }

  showAll() {
    this.rxjsService.showAll();
  }

  showCompleted() {
    this.rxjsService.showCompleted();
  }

  showPending() {
    this.rxjsService.showPending();
  }

  addTask(task: Task) {
    this.rxjsService.addToTop(task);
  }

  updateTask(task: Task) {
    this.rxjsService.updateStatusTask(task);
  }

  deleteTask(taskId: string) {
    this.rxjsService.deleteTask(taskId);
  }

}

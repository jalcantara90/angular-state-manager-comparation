import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../task.model';

const INITIAL_STATE = [
  new Task('Photos', 'pending'),
  new Task('Recipes', 'pending'),
  new Task('Work', 'pending'),
  new Task('Vacation Itinerary', 'completed'),
  new Task('Kitchen Remodel', 'completed'),
];

@Injectable({
  providedIn: 'root',
})
export class TaskStateRxjsService {
  state = INITIAL_STATE;
  private taskList = new BehaviorSubject([]);
  taskList$ = this.taskList.asObservable();

  constructor() {}

  getTask() {
    this.taskList.next(this.state);
  }

  showAll() {
    this.taskList.next(this.state);
  }

  showCompleted() {
    const state = this.state.filter(task => task.status === 'completed');
    this.taskList.next(state);
  }

  showPending() {
    const state = this.state.filter(task => task.status === 'pending');
    this.taskList.next(state);
  }

  deleteTask(taskId: string) {
    this.state = this.state.filter(task => task.id !== taskId);
    this.taskList.next(this.state);
  }

  updateStatusTask(task: Task) {
    const updatedTask = this.state.find(t => t.id === task.id);
    updatedTask.toogleStatus();
    this.taskList.next(this.state);
  }

  addToTop(task: Task) {
    this.state.unshift(task);
    this.taskList.next(this.state);
  }
}

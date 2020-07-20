import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, merge, combineLatest } from 'rxjs';
import { Task } from '../task/task.model';
import { startWith, map, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskStateRxjsService {
  private state = new BehaviorSubject([]);
  private showAllSubject: Subject<Task[]> = new Subject();
  private showCompleteSubject: Subject<Task[]> = new Subject();
  private showPendingSubject: Subject<Task[]> = new Subject();
  private filterActions$ = merge(
    this.showAllSubject,
    this.showCompleteSubject.pipe(mapTo('completed')),
    this.showPendingSubject.pipe(mapTo('pending'))
  ).pipe(startWith(''));

  public taskList$ = combineLatest([
    this.state.asObservable(),
    this.filterActions$
  ]).pipe(
    map(([taskList, filter]) => taskList
      .filter(task => filter ? task.status === filter : true)
      .map(task => new Task(task.description, task.status, task.id))
    )
  );

  constructor() {}

  getTask() {
    this.state.next([
      new Task('Photos', 'pending'),
      new Task('Recipes', 'pending'),
      new Task('Work', 'pending'),
      new Task('Vacation Itinerary', 'completed'),
      new Task('Kitchen Remodel', 'completed'),
    ]);
  }

  showAll() {
    this.showAllSubject.next();
  }

  showCompleted() {
    this.showCompleteSubject.next();
  }

  showPending() {
    this.showPendingSubject.next();
  }

  deleteTask(taskId: string) {
    const state = this.state.getValue().filter(task => task.id !== taskId);
    this.state.next(state);
  }

  updateStatusTask(task: Task) {
    const taskList = this.state.getValue();
    const updatedTask = taskList.find(t => t.id === task.id);
    updatedTask.toogleStatus();
    this.state.next(taskList);
  }

  addToTop(task: Task) {
    const taskList = this.state.getValue();
    taskList.push(task);
    this.state.next(taskList);
  }
}

import { Injectable } from '@angular/core';
import { TaskStore } from './task.store';
import { TaskQuery } from './task.query';
import { Task } from '../task/task.model';
import { Subject, merge, ReplaySubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskAkitaStoreService {
  showAllSubject: ReplaySubject<Task[]> = new ReplaySubject(1);
  showAll$ = this.showAllSubject.asObservable().pipe(
    switchMap(() => this.taskQuery.selectAll())
  );

  showCompleteSubject: Subject<Task[]> = new Subject();
  showComplete$ = this.showCompleteSubject.asObservable().pipe(
    switchMap(() =>
      this.taskQuery.selectAll({
        filterBy: task => task.status === 'completed'
      })
    )
  );

  showPendingSubject: Subject<Task[]> = new Subject();
  showPending$ = this.showPendingSubject.asObservable().pipe(
    switchMap(() =>
      this.taskQuery.selectAll({
        filterBy: task => task.status === 'pending'
      })
    )
  );

  taskList$ = merge(
    this.showAll$,
    this.showComplete$,
    this.showPending$
  ).pipe(
    map(taskList => taskList.map(task => new Task(task.description, task.status, task.id)))
  );

  constructor(
    private taskQuery: TaskQuery,
    private taskStore: TaskStore
  ) {}

  getTask() {
    this.taskStore.add([
      new Task('Photos', 'pending'),
      new Task('Recipes', 'pending'),
      new Task('Work', 'pending'),
      new Task('Vacation Itinerary', 'completed'),
      new Task('Kitchen Remodel', 'completed'),
    ]);

    this.showAll();
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

  addTask(task: Task) {
    this.taskStore.add(task);
  }

  updateTask(task: Task) {
    task.toogleStatus();
    this.taskStore.replace(task.id, task);
  }

  removeTask(taskId: string) {
    this.taskStore.remove(taskId);
  }
}

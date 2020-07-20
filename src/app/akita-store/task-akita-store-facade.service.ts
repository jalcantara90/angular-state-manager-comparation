import { Injectable } from '@angular/core';
import { TaskFacadeInterface } from '../shared/task-facade.interface';
import { Subject, merge, combineLatest } from 'rxjs';
import { Task } from '../task/task.model';
import { map, mapTo, startWith } from 'rxjs/operators';
import { TaskQuery } from './task.query';
import { TaskStore } from './task.store';

@Injectable({
  providedIn: 'root'
})
export class TaskAkitaStoreFacadeService implements TaskFacadeInterface {

  public showAll$ = this.taskQuery.selectAll();

  private showAllSubject = new Subject();
  private showCompleteSubject = new Subject();
  private showPendingSubject = new Subject();

  private filteringActions$ = merge(
    this.showAllSubject,
    this.showCompleteSubject.pipe(mapTo('completed')),
    this.showPendingSubject.pipe(mapTo('pending'))
  ).pipe(startWith(''));

  public taskList$ = combineLatest([
    this.showAll$,
    this.filteringActions$
  ]).pipe(
    map(([taskList, filter]) => taskList
      .filter(task => filter ? task.status === filter : true)
      .map(task => new Task(task.description, task.status, task.id))
    )
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

  deleteTask(taskId: string) {
    this.taskStore.remove(taskId);
  }
}

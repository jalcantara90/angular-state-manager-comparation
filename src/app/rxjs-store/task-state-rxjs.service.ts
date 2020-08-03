import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, merge, combineLatest } from 'rxjs';
import { Task } from '../task/task.model';
import { startWith, map, mapTo, tap, withLatestFrom, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskStateRxjsService {
  private state: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  private showAllSubject: Subject<Task[]> = new Subject();
  private showCompleteSubject: Subject<Task[]> = new Subject();
  private showPendingSubject: Subject<Task[]> = new Subject();
  private deleteTaskSubject: Subject<string> = new Subject();
  private addTaskSubject: Subject<Task> = new Subject();
  private updateTaskSubject: Subject<Task> = new Subject();

  private filterActions$ = merge(
    this.showAllSubject,
    this.showCompleteSubject.pipe(mapTo('completed')),
    this.showPendingSubject.pipe(mapTo('pending'))
  ).pipe(startWith(''));

  private deleteTask$ = this.deleteTaskSubject.pipe(
    withLatestFrom(this.state),
    tap(([taskId, taskList]) => {
      const state = taskList.filter(task => task.id !== taskId);
      this.state.next(state);
    })
  );

  private addTask$ = this.addTaskSubject.pipe(
    withLatestFrom(this.state),
    tap(([task, taskList]) => {
      taskList.push(task);
      this.state.next(taskList);
    })
  );

  private updateTask$ = this.updateTaskSubject.pipe(
    withLatestFrom(this.state),
    tap(([task, taskList]) => {
      const updatedTask = taskList.find(t => t.id === task.id);
      updatedTask.toogleStatus();
      this.state.next(taskList);
    })
  );

  private crudActions$ = merge(
    this.addTask$,
    this.deleteTask$,
    this.updateTask$
  ).pipe(switchMap(() => this.state));

  private conbinedState$ = combineLatest([
    this.state.asObservable(),
    this.filterActions$
  ]).pipe(
    map(([taskList, filter]) => taskList
      .filter(task => filter ? task.status === filter : true)
      .map(task => new Task(task.description, task.status, task.id))
    )
  );

  public taskList$ = merge(
    this.crudActions$,
    this.conbinedState$
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
    this.deleteTaskSubject.next(taskId);
  }

  updateStatusTask(task: Task) {
    this.updateTaskSubject.next(task);
  }

  addToTop(task: Task) {
    this.addTaskSubject.next(task);
  }
}

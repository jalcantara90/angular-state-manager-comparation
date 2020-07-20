import { Injectable } from '@angular/core';
import { TaskFacadeInterface } from '../shared/task-facade.interface';
import { Observable, Subject, merge, combineLatest } from 'rxjs';
import { Task } from '../task/task.model';
import { Store, Select } from '@ngxs/store';
import { TaskStateService } from './task-state.service';
import { GetTaskList, AddTask, RemoveTask, UpdateTask } from './task.actions';
import { map, mapTo, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NgxsStoreFacadeService implements TaskFacadeInterface {

  @Select(TaskStateService.showAll) showAll$: Observable<Task[]>;

  private showAllSubject = new Subject();
  private showPendingSubject = new Subject();
  private showCompleteSubject = new Subject();

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

  constructor(private store: Store) { }

  public getTask(): void {
    this.store.dispatch(new GetTaskList([
      new Task('Photos', 'pending'),
      new Task('Recipes', 'pending'),
      new Task('Work', 'pending'),
      new Task('Vacation Itinerary', 'completed'),
      new Task('Kitchen Remodel', 'completed'),
    ]));
  }

  public showAll(): void {
    this.showAllSubject.next();
  }

  public showCompleted(): void {
    this.showCompleteSubject.next();
  }

  public showPending(): void {
    this.showPendingSubject.next();
  }

  public addTask(task: Task): void {
    this.store.dispatch(new AddTask(task));
  }

  public updateTask(task: Task): void {
    this.store.dispatch(new UpdateTask(task));
  }

  public deleteTask(taskId: string): void {
    this.store.dispatch(new RemoveTask(taskId));
  }
}

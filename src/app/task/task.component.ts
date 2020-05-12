import { Component, OnInit } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { map, tap, shareReplay, switchMap, filter } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Task } from './task.model';
import { List } from '../shared/list.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  public taskList: List<Task>;
  public taskList$: Observable<Task[]>;

  public filterPending: Subject<void> = new Subject();
  public filterCompleted: Subject<void> = new Subject();
  public showAll: Subject<void> = new Subject();
  public onSubmit: Subject<any> = new Subject();
  public updateTask: Subject<Task> = new Subject();

  public taskForm: FormGroup = new FormGroup({
    description: new FormControl('')
  });

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngOnInit(): void {
    this.taskList = new List([
      new Task('Photos','pending'),
      new Task('Recipes','pending'),
      new Task('Work','pending'),
      new Task('Vacation Itinerary','completed'),
      new Task('Kitchen Remodel','completed'),
    ]);

    const all$ = this.showAll.pipe(switchMap(() => this.taskList.data$));
    
    const completed$ = this.filterCompleted.pipe(
      switchMap(() => this.taskList.data$.pipe(
        map((list: Task[]) => list.filter(task => task.status === 'completed'))
      ))
    );

    const pending$ = this.filterPending.pipe(
      switchMap(() => this.taskList.data$.pipe(
        map((list: Task[]) => list.filter(task => task.status === 'pending'))
      ))
    );

    const addTask$ = this.onSubmit.pipe(
      filter(() => this.taskForm.valid),
      map(() => this.taskForm.value),
      tap(({description}) => {
        const newTask: Task = new Task(description, 'pending');
        this.taskList.addTop(newTask);

        this.taskForm.get('description').reset();
      }),
      switchMap(() => this.taskList.data$)
    );

    const updateTask$ = this.updateTask.pipe(
      tap(task => {
        task = task.toogleStatus();
        this.taskList.updateById(task.id, task);
      }),
      switchMap(() => this.taskList.data$)
    );

    this.taskList$ = merge(
      this.taskList.data$,
      all$,
      completed$,
      pending$,
      addTask$,
      updateTask$
    );

  }

}

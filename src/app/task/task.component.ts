import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Task } from './task.model';
import { TaskFacadeService } from './task-facade.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(
    private breakpointObserver: BreakpointObserver,
    private taskFacadeService: TaskFacadeService
  ) { }

  public taskList$: Observable<Task[]>;

  public onSubmit: Subject<any> = new Subject();

  public taskForm: FormGroup = new FormGroup({
    description: new FormControl('')
  });

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngOnInit(): void {
    // this.taskList = new List([
    //   new Task('Photos','pending'),
    //   new Task('Recipes','pending'),
    //   new Task('Work','pending'),
    //   new Task('Vacation Itinerary','completed'),
    //   new Task('Kitchen Remodel','completed'),
    // ]);

    // const all$ = this.showAll.pipe(switchMap(() => this.taskList.data$));

    // const completed$ = this.filterCompleted.pipe(
    //   switchMap(() => this.taskList.data$.pipe(
    //     map((list: Task[]) => list.filter(task => task.status === 'completed'))
    //   ))
    // );

    // const pending$ = this.filterPending.pipe(
    //   switchMap(() => this.taskList.data$.pipe(
    //     map((list: Task[]) => list.filter(task => task.status === 'pending'))
    //   ))
    // );

    // const addTask$ = this.onSubmit.pipe(
    //   filter(() => this.taskForm.valid),
    //   map(() => this.taskForm.value),
    //   tap(({description}) => {
    //     const newTask: Task = new Task(description, 'pending');
    //     this.taskList.addTop(newTask);

    //     this.taskForm.get('description').reset();
    //   }),
    //   switchMap(() => this.taskList.data$)
    // );

    // const updateTask$ = this.updateTask.pipe(
    //   tap(task => {
    //     task = task.toogleStatus();
    //     this.taskList.updateById(task.id, task);
    //   }),
    //   switchMap(() => this.taskList.data$)
    // );

    // this.taskList$ = merge(
    //   this.taskList.data$,
    //   all$,
    //   completed$,
    //   pending$,
    //   addTask$,
    //   updateTask$
    // );

    this.taskList$ = this.taskFacadeService.taskList$;
  }

  showAll() {
    this.taskFacadeService.showAll();
  }

  showCompleted() {
    this.taskFacadeService.showCompleted();
  }

  showPending() {
    this.taskFacadeService.showPending();
  }

  addToTop(form: FormGroup) {
    const task = new Task(form.get('description').value, 'pending');
    this.taskFacadeService.addToTop(task);
    this.taskForm.reset();
  }

  updateTask(taskId: string) {
    this.taskFacadeService.updateTask(taskId);
  }

  deleteTask(taskId: string) {
    this.taskFacadeService.deleteTask(taskId);
  }

}

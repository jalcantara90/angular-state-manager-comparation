import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Task } from './task.model';
import { TaskFacadeService } from './task-facade.service';
import { TaskNgrxStoreFacadeService } from '../ngrx-store/task-ngrx-store-facade.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(
    private breakpointObserver: BreakpointObserver,
    private taskFacadeService: TaskFacadeService,
    private taskNgrxFacadeService: TaskNgrxStoreFacadeService
  ) { }

  public taskList$: Observable<Task[]>;

  public taskForm: FormGroup = new FormGroup({
    description: new FormControl('')
  });

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngOnInit(): void {
    this.taskList$ = this.taskNgrxFacadeService.taskList$;

    this.taskNgrxFacadeService.getTask();
  }

  showAll() {
    this.taskNgrxFacadeService.showAll();
  }

  showCompleted() {
    this.taskNgrxFacadeService.showCompleted();
  }

  showPending() {
    this.taskNgrxFacadeService.showPending();
  }

  addToTop(form: FormGroup) {
    const task = new Task(form.get('description').value, 'pending');
    this.taskNgrxFacadeService.addToTop(task);
    this.taskForm.reset();
  }

  updateTask(task: Task) {
    this.taskNgrxFacadeService.updateTask(task);
  }

  deleteTask(taskId: string) {
    this.taskNgrxFacadeService.deleteTask(taskId);
  }

}

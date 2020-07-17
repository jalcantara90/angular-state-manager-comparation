import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Task } from './task.model';
import { TaskFacadeService } from './task-facade.service';
import { TaskNgrxStoreFacadeService } from '../ngrx-store/task-ngrx-store-facade.service';
import { TaskAkitaStoreFacadeService } from '../akita-store/task-akita-store-facade.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(
    private breakpointObserver: BreakpointObserver,
    private taskFacadeService: TaskFacadeService,
    private taskNgrxFacadeService: TaskNgrxStoreFacadeService,
    private taskAkitaFacadeService: TaskAkitaStoreFacadeService
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
    this.taskList$ = this.taskAkitaFacadeService.taskList$;

    this.taskAkitaFacadeService.getTask();
  }

  showAll() {
    this.taskAkitaFacadeService.showAll();
  }

  showCompleted() {
    this.taskAkitaFacadeService.showCompleted();
  }

  showPending() {
    this.taskAkitaFacadeService.showPending();
  }

  addToTop(form: FormGroup) {
    const task = new Task(form.get('description').value, 'pending');
    this.taskAkitaFacadeService.addToTop(task);
    this.taskForm.reset();
  }

  updateTask(task: Task) {
    this.taskAkitaFacadeService.updateTask(task);
  }

  deleteTask(taskId: string) {
    this.taskAkitaFacadeService.deleteTask(taskId);
  }

}

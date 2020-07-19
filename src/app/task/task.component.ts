import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Task } from './task.model';
import { TaskFacadeService } from '../rxjs-store/task-state-rxjs-facade.service';
import { TaskNgrxStoreFacadeService } from '../ngrx-store/task-ngrx-store-facade.service';
import { TaskAkitaStoreFacadeService } from '../akita-store/task-akita-store-facade.service';
import { NgxsStoreFacadeService } from '../ngxs-store/ngxs-store-facade.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(
    private breakpointObserver: BreakpointObserver,
    // private taskFacadeService: TaskFacadeService, // uncomment to use RxJS based state
    private taskFacadeService: TaskNgrxStoreFacadeService, // uncomment to use NGRX state
    // private taskFacadeService: TaskAkitaStoreFacadeService, // uncomment to use Akita based state
    // private taskFacadeService: NgxsStoreFacadeService // uncomment to use NGXS state
  ) { }

  public taskList$: Observable<Task[]> = this.taskFacadeService.taskList$;

  public taskForm: FormGroup = new FormGroup({
    description: new FormControl('')
  });

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngOnInit(): void {
    this.taskFacadeService.getTask();
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

  addTask(form: FormGroup) {
    const task = new Task(form.get('description').value, 'pending');
    this.taskFacadeService.addTask(task);
    this.taskForm.reset();
  }

  updateTask(task: Task) {
    this.taskFacadeService.updateTask(task);
  }

  deleteTask(taskId: string) {
    this.taskFacadeService.deleteTask(taskId);
  }

}

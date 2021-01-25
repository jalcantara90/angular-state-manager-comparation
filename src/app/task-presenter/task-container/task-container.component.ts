import { Task } from './../../task/task.model';
import { Component, OnInit } from '@angular/core';
import { TaskFacadeService } from '../../rxjs-store/task-state-rxjs-facade.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss']
})
export class TaskContainerComponent implements OnInit {
  taskList$ = this.taskFacadeService.taskList$;
  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(
    private taskFacadeService: TaskFacadeService,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.taskFacadeService.getTask();
  }

  addTask(task: Task) {
    this.taskFacadeService.addTask(task);
  }

  taskFilter(filter: string): void {
    switch(filter) {
      case 'pending':
        this.taskFacadeService.showPending();
        break;
      case 'completed':
        this.taskFacadeService.showCompleted();
        break;
      default:
        this.taskFacadeService.showAll();
        break;
    }
  }

  deleteTask(taskId: string) {
    this.taskFacadeService.deleteTask(taskId);
  }

  updateTask(task: Task) {
    this.taskFacadeService.updateTask(task);
  }
}

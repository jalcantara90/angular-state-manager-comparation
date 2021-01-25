import { TaskListPresenter } from './task-list.presenter';
import { Task } from './../../task/task.model';
import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TaskListPresenter]
})
export class TaskListComponent {
  @Input() isHandset: boolean;
  @Input() taskList: Task[];
  @Output('update') get update() {
    return this.presenter.update$;
  }

  @Output('delete') get delete() {
    return this.presenter.delete$;
  }

  constructor(private presenter: TaskListPresenter) { }

  updateTask(task: Task) {
    this.presenter.updateTask(task);
  }

  deleteTask(taskId: string) {
    this.presenter.deleteTask(taskId);
  }

}

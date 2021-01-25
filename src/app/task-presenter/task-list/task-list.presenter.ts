import { Task } from './../../task/task.model';
import { Subject } from "rxjs";

export class TaskListPresenter {
  private update = new Subject<Task>();
  private delete = new Subject<string>();

  update$ = this.update.asObservable();
  delete$ = this.delete.asObservable();

  updateTask(task: Task) {
    this.update.next(task);
  }

  deleteTask(taskId: string) {
    this.delete.next(taskId);
  }
}

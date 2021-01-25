import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Task } from '../../task/task.model';

export class TaskCreatorPresenter {
  private add = new Subject<string>();
  public add$ = this.add.asObservable().pipe(
    filter((description) => !!description),
    map(description => new Task(description.trim(), 'pending'))
  );

  public descriptionControl: FormControl = new FormControl('');

  addTask() {
    const task = this.descriptionControl.value;
    this.descriptionControl.reset();
    this.add.next(task);
  }
}

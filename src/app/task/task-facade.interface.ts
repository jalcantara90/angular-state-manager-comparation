import { Observable } from 'rxjs';
import { Task } from './task.model';

export interface TaskFacadeInterface {
  taskList$: Observable<Task[]>;

  showAll: () => void;
  showCompleted: () => void;
  showPending: () => void;
  addToTop: (task: Task) => void;
  updateTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
}

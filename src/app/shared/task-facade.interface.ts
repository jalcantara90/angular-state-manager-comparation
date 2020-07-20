import { Observable } from 'rxjs';
import { Task } from '../task/task.model';

export interface TaskFacadeInterface {
  taskList$: Observable<Task[]>;

  getTask: () => void;
  showAll: () => void;
  showCompleted: () => void;
  showPending: () => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
}

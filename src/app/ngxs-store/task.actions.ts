import { Task } from 'src/app/task/task.model';

export class GetTaskList {
  static readonly type = '[NGXS TASK] - GET TASK LIST';
  constructor(public taskList: Task[]) {}
}

export class AddTask {
  static readonly type = '[NGXS TASK] - ADD TASK';
  constructor(public task: Task) {}
}

export class RemoveTask {
  static readonly type = '[NGXS TASK] - REMOVE TASK';
  constructor(public taskId: string) {}
}

export class UpdateTask {
  static readonly type = '[NGXS TASK] - UPDATE TASK';
  constructor(public task: Task) {}
}

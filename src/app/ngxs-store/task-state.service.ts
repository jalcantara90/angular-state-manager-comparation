import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Task } from '../task/task.model';
import { GetTaskList, AddTask, RemoveTask, UpdateTask } from './task.actions';

@State<Task[]>({
  name: 'tasks',
  defaults: []
})
@Injectable()
export class TaskStateService {

  @Selector()
  static showAll(state: Task[]) {
    return state.map(task => new Task(task.description, task.status, task.id));
  }

  @Selector()
  static showPending(state: Task[]) {
    return state.filter(task => task.status === 'pending').map(task => new Task(task.description, task.status, task.id));
  }

  @Selector()
  static showCompleted(state: Task[]) {
    return state.filter(task => task.status === 'completed').map(task => new Task(task.description, task.status, task.id));
  }

  constructor() { }

  @Action(GetTaskList)
  getTask(ctx: StateContext<Task[]>, action: GetTaskList) {
    ctx.setState(action.taskList);
  }

  @Action(AddTask)
  addTask(ctx: StateContext<Task[]>, action: AddTask) {
    const state = ctx.getState();
    ctx.setState([...state, action.task]);
  }

  @Action(UpdateTask)
  updateTask(ctx: StateContext<Task[]>, action: UpdateTask) {
    const state = [...ctx.getState()];
    action.task.toogleStatus();
    const actionIndex = state.findIndex(task => task.id === action.task.id);
    state[actionIndex] = action.task;
    ctx.setState(state);
  }

  @Action(RemoveTask)
  removeTask(ctx: StateContext<Task[]>, action: RemoveTask) {
    const state = ctx.getState();
    ctx.setState(state.filter(task => task.id !== action.taskId));
  }
}

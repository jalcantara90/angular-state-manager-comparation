import { TaskListPresenter } from './task-list.presenter';
import { Task } from '../../task/task.model';

describe('TaskListPresenter should', () => {
  let taskPresenter: TaskListPresenter;
  let updateSpy: jasmine.Spy;
  let deleteSpy: jasmine.Spy;

  beforeEach(() => {
    taskPresenter = new TaskListPresenter();
    updateSpy = jasmine.createSpy('update');
    deleteSpy = jasmine.createSpy('delete');

    taskPresenter.delete$.subscribe(deleteSpy);
    taskPresenter.update$.subscribe(updateSpy);
  });

  it('emit task on user updates', () => {
    const task = new Task('Test', 'pending');
    taskPresenter.updateTask(task);

    expect(updateSpy).toHaveBeenCalledWith(task);
  });

  it('emit taskId on user delete\'s task', () => {
    const taskId = 'taskId1';
    taskPresenter.deleteTask(taskId);

    expect(deleteSpy).toHaveBeenCalledWith(taskId);
  });
});

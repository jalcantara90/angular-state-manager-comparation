import { TaskCreatorPresenter } from './task-creator.presenter';
import { Task } from '../../task/task.model';
import { map } from 'rxjs/operators';

describe('TaskCreatorPresenter should', () => {
  let presenter: TaskCreatorPresenter;
  let addSpy: jasmine.Spy;

  beforeEach(() => {
    presenter = new TaskCreatorPresenter();
    addSpy = jasmine.createSpy('addSpy');

    presenter.add$.pipe(
      map(task => new Task(task.description, task.status, 'test'))
    ).subscribe(addSpy);
  });

  it('not emit empty events', () => {
    presenter.addTask();
    expect(addSpy).not.toHaveBeenCalled();
  });

  it('emit task with description control value and pending status', () => {
    const expected = new Task('Task test', 'pending', 'test');
    presenter.descriptionControl.setValue('Task test');
    presenter.addTask();
    expect(addSpy).toHaveBeenCalledWith(expected);
  })
});

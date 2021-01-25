import { FormControl } from '@angular/forms';
import { Component, HostListener, OnInit, Output } from '@angular/core';
import { TaskCreatorPresenter } from './task-creator.presenter';

@Component({
  selector: 'app-task-creator',
  templateUrl: './task-creator.component.html',
  styleUrls: ['./task-creator.component.scss'],
  providers: [TaskCreatorPresenter]
})
export class TaskCreatorComponent {

  @Output('add') get add() {
    return this.presenter.add$;
  }

  get descriptionControl(): FormControl {
    return this.presenter.descriptionControl;
  }

  constructor(
    private presenter: TaskCreatorPresenter
  ) { }

  @HostListener('keydown.enter')
  addTask(): void {
    this.presenter.addTask();
  }

}

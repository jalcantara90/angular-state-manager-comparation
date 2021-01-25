import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskPresenterRoutingModule } from './task-presenter-routing.module';
import { TaskContainerComponent } from './task-container/task-container.component';
import { TaskCreatorComponent } from './task-creator/task-creator.component';
import { TaskFilterComponent } from './task-filter/task-filter.component';
import { MaterialModule } from '../shared/material.module';
import { TaskListComponent } from './task-list/task-list.component';


@NgModule({
  declarations: [TaskContainerComponent, TaskCreatorComponent, TaskFilterComponent, TaskListComponent],
  imports: [
    CommonModule,
    TaskPresenterRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class TaskPresenterModule { }

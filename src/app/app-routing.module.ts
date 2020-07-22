import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TaskComponent } from './task/task.component';


const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'task', component: TaskComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

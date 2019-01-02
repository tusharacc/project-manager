import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'view-task', component: ViewTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'ignore'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { UserDetailComponent } from './user/list-user/user-detail/user-detail.component';
import { UserUtilityComponent } from './user/list-user/user-utility/user-utility.component';
import { ProjectComponent } from './project/project.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { ViewProjectComponent } from './project/view-project/view-project.component';
import { ProjectUtilityComponent } from './project/project-utility/project-utility.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ModalComponent } from './modal/modal.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { SearchTaskComponent } from './view-task/search-task/search-task.component';
import { ListTaskComponent } from './view-task/list-task/list-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    AddUserComponent,
    ListUserComponent,
    UserDetailComponent,
    UserUtilityComponent,
    ProjectComponent,
    AddProjectComponent,
    ViewProjectComponent,
    ProjectUtilityComponent,
    AddTaskComponent,
    ModalComponent,
    ViewTaskComponent,
    SearchTaskComponent,
    ListTaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule  
  ],
  providers: [],
  entryComponents: [ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

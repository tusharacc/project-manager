import { Component, OnInit,ViewChild } from '@angular/core';
import { ViewProjectComponent } from './view-project/view-project.component';
import { Project } from '../project';
import { AddProjectComponent } from './add-project/add-project.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @ViewChild('appViewProject')  private projectView: ViewProjectComponent;
  @ViewChild('appAddProject') private addProject: AddProjectComponent;
  constructor() { }

  ngOnInit() {
  }

  refreshProjectList(val){
    console.log('Event triggered refreshProjectList');
    this.projectView.getProjects();
  }

  sortTheList(val){
    console.log('Caught in parent',val)
    this.projectView.performSort(val);
  }

  updateTask(project:Project){
    this.addProject.updateTask(project);
  }

}

import { Component, OnInit,ViewChild,Output,EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DataService } from 'src/app/data.service';
import { Project } from 'src/app/project';
import { ViewProjectComponent } from '../view-project/view-project.component';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  projectName:string;
  priority: number;
  startDate:NgbDateStruct;
  endDate:NgbDateStruct;
  employeeName:string;
  managerName: Array<{}>;
  projectDetails: Project = new Project();
  @Input() buttonText: string;
  
  @Output() projectAdded  = new EventEmitter<any>();
  @ViewChild('f') addProjectForm: NgForm;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.managerName =this.dataService.users;
    this.buttonText = 'Add'
    console.log('List of ManagerName',this.managerName);
  }

  addProject(form:NgForm){
    console.log('Forms',form)
    this.projectDetails.projectName = form['value']['projectName'];
    this.projectDetails.startDate = form['value']['startDate'];
    this.projectDetails.endDate = form['value']['endDate'];
    this.projectDetails.priority = form['value']['priority'];
    this.projectDetails.managerEmpId = form['value']['managerName'];
    this.projectDetails.completed = "In Progress"
        
    this.dataService.addproject(this.projectDetails);
    this.addProjectForm.reset();
    

    //this.projectAdded.emit(null);
 
 
  }
  
  updateTask(project:Project){
    console.log('incoming data',project)
    let stDate:Date = new Date(project.startDate);
    let edDate:Date = new Date(project.endDate);
    console.log('End Date',edDate);
    this.projectName = project.projectName;
    this.priority =  project.priority;
    this.startDate = {'year': stDate.getFullYear(),'month':stDate.getMonth()+1,'day':stDate.getDate() };
    this.endDate = {'year': edDate.getFullYear(),'month':edDate.getMonth()+1,'day':edDate.getDate() };
    console.log('project.managerEmpId',project.managerEmpId)
    this.employeeName = project.managerEmpId;
    this.buttonText = 'Update'
  }
    
}



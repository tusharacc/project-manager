import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Project } from '../project';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as Fuse from 'fuse.js';
import * as _ from "lodash";
import { ModalComponent } from '../modal/modal.component';
import { User } from '../user';
import { Task } from '../task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  sucess:boolean;
  error: boolean;
  message: string;
  projectNameIsInvalid:boolean;
  projectNameIsValid: boolean;
  taskNameIsInvalid:boolean;
  taskNameIsValid: boolean;
  parentTaskIsInvalid: boolean;
  parentTaskIsValid: boolean;
  startDateIsInvalid:boolean;
  startDateIsValid: boolean;
  endDateIsInvalid:boolean;
  endDateIsValid: boolean;
  userNameIsValid: boolean;
  userNameIsInvalid: boolean;
  projectName: string;
  taskName: string;
  priority: number;
  parentTask: string;
  startDate: Date;
  endDate: Date;
  projectsList: Array<string>=[];
  userList: Array<string> = [];
  userName: string;
  disabled: boolean = false;
  taskDetails: Task = new Task();
  @ViewChild('f') addTaskForm: NgForm;

  constructor(private dataService: DataService,private modalService: NgbModal) { }

  ngOnInit() {
    console.log('Type of',typeof this.dataService.projects);
    this.dataService.projects.forEach((data:Project) => {
      this.projectsList.push(data['projectName']);
    });
    this.dataService.users.forEach((data:User) => {
      this.userList.push(data['firstName'] + ' ' + data['lastName'] + ', Emp ID - ' + data['employeeId']);
    });
    console.log('Project List',this.projectsList);
  }

  addTask(form:NgForm){

    if (this.validateData(form)){
      this.taskDetails.taskName = form['value']['taskName'];
      let projectName = form['value']['projectName'];
      this.taskDetails.projectId = this.dataService.getProjectId(projectName);
      this.taskDetails.startDate = form['value']['startDate'];
      this.taskDetails.endDate = form['value']['endDate'];
      this.taskDetails.priority = form['value']['priority'];
      if (!this.taskDetails.priority && this.taskDetails.priority != 0){
        this.taskDetails.priority = 15
      } 
      this.taskDetails.parentTask = form['value']['parentTask'];
      this.taskDetails.managerEmpId = _.last(form['value']['userName'].split(' '));
      this.taskDetails.completed = false;
      
      this.dataService.addTask(this.taskDetails,true);
      this.addTaskForm.reset();
    }
  }

  resetForm(){
    this.addTaskForm.reset();
  }

  validateData(form:NgForm){
    
    let valid = true;
    console.log(form)
    if (!form['value']['projectName']){
      this.projectNameIsInvalid = true;
      this.projectNameIsValid = false;
      valid = false
    } else {
      this.projectNameIsValid = true;
      this.projectNameIsInvalid = false
    }
    
    if (!form['value']['taskName']){
      this.taskNameIsInvalid = true;
      this.taskNameIsValid = false;
      valid = false
    } else {
      this.taskNameIsValid = true;
      this.taskNameIsInvalid = false;
    }

    if (!form['value']['userName']){
      this.userNameIsInvalid = true;
      this.userNameIsValid = false;
      valid = false
    } else {
      this.userNameIsValid = true;
      this.userNameIsInvalid = false;
    }

    if (!form['value']['chkboxParentTask']){
      if (!form['value']['parentTask']){
        this.parentTaskIsInvalid = true;
        this.parentTaskIsValid = false;
        valid = false
      } else {
        this.parentTaskIsInvalid = false;
        this.parentTaskIsValid = true;
      }

      if (!form['value']['startDate']){
        this.startDateIsInvalid = true;
        this.startDateIsValid = false;
        valid = false
      } else {
        this.startDateIsInvalid = false;
        this.startDateIsValid = true;
      }

      if (!form['value']['endDate']){
        this.endDateIsInvalid = true;
        this.endDateIsValid = false;
        valid = false
      } else {
        this.endDateIsInvalid = false;
        this.endDateIsValid = true;
      }
      console.log('date type',form['value']['startDate'])
      if (form['value']['startDate'] > form['value']['endDate'] ){
        this.endDateIsInvalid = true;
        this.endDateIsValid = false;
        this.startDateIsInvalid = true;
        this.startDateIsValid = false;
      } 

    } else {
      this.endDateIsInvalid = null;
      this.endDateIsValid = null;
      this.startDateIsInvalid = null;
      this.startDateIsValid = null;
      this.parentTaskIsInvalid = null;
      this.parentTaskIsValid = null;
      
      
    }

    if (!valid){
      return false;
    } else {
      return true;
    }

  }

  getUserName = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.userList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1))
    )

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.projectsList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1))
    )
  searchName(form:NgForm){

    let options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1
    };
    let fuse = new Fuse(this.userList, options); 
    let result = fuse.search(form['value']['userName']);
    console.log('Result',result);
    console.log('Result',this.userList[result[0]]);
    console.log('The fuzzy search',result.map(data=>this.userList[data]));
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.sourceData = 'User Name';
    modalRef.componentInstance.inputData = result.map(data=>this.userList[data]);
    modalRef.componentInstance.selectedValue.subscribe((value) => {
      this.userName = value ;
    })

  }

  seacrhProject(form:NgForm){
    let options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1
    };
    let fuse = new Fuse(this.projectsList, options); 
    let result = fuse.search(form['value']['projectName']);
    console.log('Result',result);
    console.log('Result',this.projectsList[result[0]]);
    console.log('The fuzzy search',result.map(data=>this.projectsList[data]));
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.sourceData = 'Project Name';
    modalRef.componentInstance.inputData = result.map(data=>this.projectsList[data]);
    modalRef.componentInstance.selectedValue.subscribe((value) => {
      this.projectName = value ;
    })
  }

  onCheckboxChange(val){
    if (val['srcElement']['checked']){
      this.disabled = true
    } else {
      this.disabled = false
    }
  }
}

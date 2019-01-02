import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject }    from 'rxjs';
import { User } from './user';
import { Observable } from 'rxjs';
import { Project } from './project';
import { Task } from './task';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: string = 'http://localhost:3000/api'
  users:User[];
  projects: Project[];
  tasks:Task[];
  addProjectCall: boolean = false;
  private projectAdded = new Subject<string>();
  private taskAdded = new Subject<string>();

  projectAddedSuccess$ = this.projectAdded.asObservable();
  taskAddedSuccess$ = this.taskAdded.asObservable();

  constructor(private http: HttpClient) { }

  getUsers() {
    let url = this.baseUrl + '/users';
    this.http.get(url).subscribe((data:User[])=> {
      this.users = data['data'];
      console.log(this.users);
    });
  }

  getFirstNameAndLastName(employeeId:string){
    let firstName, lastName;
    this.users.forEach((data)=>{
      if (data.employeeId === employeeId){
        firstName = data.firstName
        lastName = data.lastName
      }
    })
    return firstName+lastName
  }

  updateUsers(data:{'id':string,'update':{}}){
    let url = this.baseUrl + '/users/update';
    this.http.post(url,data).subscribe((data:User[])=> {
      //this.users = data['data'];
      console.log(this.users);
    });
  }

  addTask(data:Task,getTask: boolean){
    let url = this.baseUrl + '/tasks/add';
    this.http.post(url,data).subscribe((data)=> {
      console.log('Task Added',data);
    },()=>{},()=>{
      if (getTask){
        this.getTasks(true);
      }
    });
  }

  addproject(data:Project){
    let url = this.baseUrl + '/projects/add';
    this.addProjectCall = true
    console.log('I am add project');
    this.http.post(url,data).subscribe((data)=> {

      console.log(data);
    },(err) => {
      console.log('Error while adding project')
    },()=>{
      console.log('I am getting called now');
      this.getProjects(true)
      this.addProjectCall = false
      
    });
  }

  numberOfTasks(projectId: string){
    console.log('Incoming Project Id',projectId);
    let taskCount = 0;
    let completedTask = 0;
    this.tasks.forEach((data:Task)=>{
      if (data.projectId === projectId){
        taskCount++;
        if (data.completed === true){
          completedTask++
        }
      }
    });

    return {'tasks':taskCount,'completedTask':completedTask}
  }

  getProjectId(name:string){
    let projectId = null;
    for (let i in this.projects){
      if (this.projects[i]['projectName'] === name){
        projectId = this.projects[i]['_id']
      }
    }
    return projectId;    
  }

  getProjects(ind:boolean){
    let url = this.baseUrl + '/projects';
    this.http.get(url).subscribe((data:Project[])=> {
      this.projects = data['data'];
      console.log('projects',this.projects)
      if (ind){
        this.projectAdded.next(null);
      }
    });

  }  

  getTasks(emit: boolean){
    let url = this.baseUrl + '/tasks';
    this.http.get(url).subscribe((data:Task[])=> {
      this.tasks = data['data'];
      if (emit){
        this.taskAdded.next(null);
      }
      console.log(this.tasks);  
    })
  }

  async updateTasks(data:{'id':string,'update':{}}){

    let url = this.baseUrl + '/tasks/update';
    let result = await this.http.post(url,data).toPromise();
    this.getTasks(true);
    return result;
  }

  async updateProjects(data:{'id':string,'update':{}}){
    let url = this.baseUrl + '/projects/update';
    let result = await this.http.post(url,data).toPromise();
    console.log(result);
    this.getProjects(true);
    return result;
  }
}

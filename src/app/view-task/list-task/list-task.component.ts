import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Task } from 'src/app/task';
import { Subscription }   from 'rxjs';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  
  taskLists: Array<Task>;
  tasks:Array<{}>;
  changedData:Array<{}>=[];
  success:boolean;
  error:boolean;
  message:string;
  subscription: Subscription;
  projectId: string;

  constructor(private dataService:DataService) {
    this.subscription = dataService.taskAddedSuccess$.subscribe(
      data => {
        console.log('I am in subscription');
        this.getTasksList(this.projectId);
    });
   }

  ngOnInit() {
    
  }

  listTasks(val){
    this.projectId = this.dataService.getProjectId(val);
    console.log('projectId',this.projectId)
    this.getTasksList(this.projectId);
  }

  getTasksList(val){
    console.log('Tasks',this.dataService.tasks);
    this.tasks = [];
    this.dataService.tasks.forEach((data:Task) => {
      console.log('The id of task',data['_id']);
      if (data['projectId'] === this.projectId){
        this.tasks.push({'id':data['_id'],
                        'taskName':data.taskName,
                        'startDate':data.startDate,
                        'endDate':data.endDate,
                        'priority':data.priority,
                        'parentTask':data.parentTask,
                        'projectId':data.projectId,
                        'managerEmpId':data.managerEmpId,
                        'completed':data.completed,
                        'edit':false})
      }
    });
  }

  editTask(val:Task){
    for (let x in this.tasks){
      if (this.tasks[x]['id'] === val['id']){
        if (this.tasks[x]['edit'] === true){
          let d = this.getViewData( val['id'] );
          this.dataService.updateTasks({'id':this.tasks[x]['id'],'update':d}).then((data) => {
            if (data['status'] === 'Ok'){
              this.success = true;
              this.message = "The data got updated, Successfully!!"
              setTimeout(() => {
                this.success = null;
                this.error = null;
                this.message = null;
              }, 5000);
            }
          }).catch((err)=>{
            this.success = false
            this.error = true;
            this.message = "Run for your life!!"
          });
          console.log('I am done');
          this.tasks[x]['edit'] = false;
        } else {
          this.tasks[x]['edit'] = true;
        };
      }
    }
  }

  getViewData = (val:string) => {
    let dataToBeUpdated:{} = {};
    this.changedData.forEach((data) => {
      if (data['id'] === val){
          dataToBeUpdated[data['key']] = data['val']
      }
    });
    return dataToBeUpdated;
  }

  updatedData(id:string,val: string, ind: string){
    switch (ind){
      case 'TN':
        this.changedData.push({'val':val,'id':id,'key':'taskName'});
        break;
      case 'PN':
        this.changedData.push({'val':val,'id':id,'key':'parentTaskName'});
        break;
      case 'PR':
        this.changedData.push({'val':val,'id':id,'key':'priority'});
        break;
      case 'SD':
        this.changedData.push({'val':val,'id':id,'key':'startDate'});
        break;
      case 'ED':
        this.changedData.push({'val':val,'id':id,'key':'endDate'})
        break;
    }
  }

  completeTask(val:{}){
    this.dataService.updateTasks({'id':val['id'],'update':{'completed':true}}).then((data) => {
      if (data['status'] === 'Ok'){
        this.success = true;
        this.message = "The Task was completed, Successfully!!"
        setTimeout(() => {
          this.success = null;
          this.error = null;
          this.message = null;
        }, 5000);
      }
    }).catch((err)=>{
      this.success = false
      this.error = true;
      this.message = "Run for your life!!"
    });
  }

  performSort(val){
    let key;
    switch (val){
      case 'SD':
        key = 'startDate'
        break;
      case 'ED':
        key = 'endDate'
        break;
      case 'PR':
        key = 'priority'
        break;
      case 'CP':
        key = 'complete'
        break;
    }

    this.tasks.sort(function(a, b) {
      var fieldA = a[key]; // ignore upper and lowercase
      var fieldB = b[key]; // ignore upper and lowercase
      if (fieldA < fieldB) {
        return -1;
      }
      if (fieldA > fieldB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}

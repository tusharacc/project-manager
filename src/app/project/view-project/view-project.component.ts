import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Project } from 'src/app/project';
import { Subscription }   from 'rxjs';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  projects: Array<{}> = [];
  subscription: Subscription;
  @Output() updateTaskEvent  = new EventEmitter<Project>();

  constructor(private dataService: DataService) { 
    this.subscription = dataService.projectAddedSuccess$.subscribe(
      data => {
        console.log('I am in subscription');
        this.getProjects();
    });
  }

  performSort(val){
    console.log('Performing sort');
    let key;
    switch(val){
      case 'SD':
        key = 'startDate'
        break;
      case 'ED':
        key = 'endDate'
        break;
      case 'PR':
        key = 'priority';
        break;
      case 'CP':
        break;
    }

    this.projects.sort(function(a, b) {
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

  ngOnInit() {
    this.getProjects();
  }

  getProjects(){
    this.dataService.projects.forEach((project:Project)=>{
      let task_details = this.dataService.numberOfTasks(project['_id']);
      this.projects.push({'projectName':project.projectName,
                          'numberOfTasks':task_details['tasks'],
                          'completedTasks':task_details['completedTask'],
                          'startDate':project.startDate,
                          'endDate':project.endDate,
                          'priority':project.priority,
                          'managerEmpId':project.managerEmpId,
                          'id':project['_id']}
                        )
    });
    console.log('The projects',this.projects);
  }

  updateTask(project:Project){
    this.updateTaskEvent.emit(project);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  suspendTask(val){
    this.dataService.updateProjects({'id':val,'update':{'completed':'Suspend'}})
    .then((data)=>{
      console.log('Data Updated',data);
    })
    .catch((err)=>{
      console.log('Error',err);
    })
  }

}

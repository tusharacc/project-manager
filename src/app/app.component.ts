import { Component } from '@angular/core';
import { DataService } from './data.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-project-manager';
  users: User[]
  constructor (private dataService: DataService){
    dataService.getUsers();
    dataService.getProjects(false);
    dataService.getTasks(false)
  }


}

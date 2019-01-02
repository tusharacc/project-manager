import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { DataService } from 'src/app/data.service';
import { Project } from 'src/app/project';


@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.css']
})
export class SearchTaskComponent implements OnInit {
  projectName:string;
  projectsList: Array<string>=[];
  @Output() performSort  = new EventEmitter<string>();
  @Output() showTasks  = new EventEmitter<string>();
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.projects.forEach((data:Project) => {
      this.projectsList.push(data['projectName']);
    });
  }

  fetchTasks(val){
    console.log('Projet Name',this.projectName);
    this.showTasks.emit(val);
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.projectsList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1))
    )
    
  sortData(ind:string){
    this.performSort.emit(ind);
  }
}

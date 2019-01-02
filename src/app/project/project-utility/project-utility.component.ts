import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { DataService } from 'src/app/data.service';
import { Project } from 'src/app/project';

@Component({
  selector: 'app-project-utility',
  templateUrl: './project-utility.component.html',
  styleUrls: ['./project-utility.component.css']
})
export class ProjectUtilityComponent implements OnInit {
  projectsList: Array<string>=[];
  @Output() doSort  = new EventEmitter<string>();
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.projects.forEach((data:Project) => {
      this.projectsList.push(data['projectName']);
    });
  }

  performSort(val){
    console.log('Emitted',val)
    this.doSort.emit(val);
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.projectsList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1))
    )
}

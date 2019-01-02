import { Component, OnInit, ViewChild } from '@angular/core';
import { ListTaskComponent } from './list-task/list-task.component';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  show: boolean;
  @ViewChild('listTask')  private listTask: ListTaskComponent;
  
  constructor() { }

  ngOnInit() {
    this.show = false
  }

  performSort(val){
    this.listTask.performSort(val);
  }

  showTasks(val){
    console.log('Value from ShowTsks',val)
    this.listTask.listTasks(val);
  }

}

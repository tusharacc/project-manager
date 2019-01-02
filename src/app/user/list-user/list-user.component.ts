import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { UserDetailComponent } from './user-detail/user-detail.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  @ViewChild('userDetail')  private userDetail: UserDetailComponent;
  
  constructor() { }

  ngOnInit() {
  }

  onSort(val: string){
    console.log('User Component',val)
    this.userDetail.sortTheData(val);
  }

}

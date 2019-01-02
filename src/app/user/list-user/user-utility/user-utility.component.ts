import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-utility',
  templateUrl: './user-utility.component.html',
  styleUrls: ['./user-utility.component.css']
})
export class UserUtilityComponent implements OnInit {

  @Output() sort  = new EventEmitter<string>();
 
  
  constructor() { }

  ngOnInit() {
  }

  sortByFirstName(){
    console.log('sort by first name')
    this.sort.emit("FN");
  }

  sortByLastName(){
    this.sort.emit("LN");
  }

  sortById(){
    this.sort.emit("E");
  }
  

}

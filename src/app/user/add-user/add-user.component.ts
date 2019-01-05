import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user:User = new User();
  @ViewChild('F') addUserForm:NgForm

  constructor(private dataService: DataService) { 
  }

  ngOnInit() {
  }

  addUser(form:NgForm){
    this.user.firstName = form['value']['firstName']
    this.user.lastName = form['value']['lastName']
    this.user.employeeId = form['value']['employeeId']

    this.dataService.addUsers(this.user).then((data)=>{
      console.log('Data from Add User',data);
      this.addUserForm.reset();
    }).catch((err)=>{
      console.log('Error from Add User',err);
    })
  }

  resetForm(){
    this.addUserForm.reset();
  }

}

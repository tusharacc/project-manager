import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/user';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  users: Array<{}>=[];
  changeData: Array<{}>=[];
  

  constructor(private dataService: DataService) { }

  ngOnInit() {
    console.log('type of users',typeof this.dataService.users);
    this.dataService.users.forEach((data:User) => {
      console.log('User in init',data)
      this.users.push({'_id':data['_id'],'firstName':data.firstName,'lastName':data.lastName,'employeeId':data.employeeId,'edit':false})
    });
    console.log('users',this.users);
  }

  updatedData(id:string,val:string,ind:string){

    switch (ind){
      case 'FN':
        this.changeData.push({'_id':id,'val':val,'ind':'FN'})
        break;
      case 'LN':
        this.changeData.push({'_id':id,'val':val,'ind':'LN'})
        break;
      case 'EN':
        this.changeData.push({'_id':id,'val':val,'ind':'EN'})
        break
    }

    console.log('The changed data',this.changeData);

  }

  editUser(user){
    console.log(user);
    let firstName,lastName,employeeId
    for (let i = 0; i < this.users.length;i ++){
      if (this.users[i]['employeeId'] == user.employeeId){
        if (this.users[i]['edit'] === true){
          for (let j = 0; j < this.changeData.length; j++){
            if (this.changeData[j]['_id'] === user._id){
              switch (this.changeData[j]['ind']){
                case 'FN':
                  firstName = this.changeData[j]['val']
                  break;
                case 'LN':
                  lastName = this.changeData[j]['val']
                  break
                case 'EN':
                  employeeId = this.changeData[j]['val']
                  break
              }

            }
          }
          //Send update request
          this.dataService.updateUsers({'id':this.users[i]['_id'],
                                        'update':{'firstName':firstName,
                                                  'lastName':lastName,
                                                  'employeeId':employeeId}})
          this.changeData = this.changeData.filter(data => data['_id'] = user['_id']);
        } else {
          this.users[i]['edit'] = true;
          console.log('Users array',this.users[i]['edit'])
        }
      }
    }
  }

  deleteUser(user){
    //send delete request

  }

  sortTheData(val){
    let key;
    switch (val){
      case "FN":
        key = 'firstName';
        break;
      case "LN":
        key = 'lastName'
        break;
      case "E":
        key = 'employeeId'
        break;
    }

    this.users.sort(function(a, b) {
      var fieldA = a[key].toUpperCase(); // ignore upper and lowercase
      var fieldB = b[key].toUpperCase(); // ignore upper and lowercase
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

}

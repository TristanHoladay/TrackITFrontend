import {Component, ViewChild, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  Users: IUser[] = [];
  show: boolean = false;
  

  addUser: IUser = {
    id: "",
    firstName: "",
    lastName: "",
    fullName: "",
    adminRole: null,
    email: "",
    password: "",
    jobDescription: "",
    userT: null
  }

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      this.Users = data;
    });
  }

  //Update object list to force onChangeDetection
  addData(newData) {
    this.Users.push(newData);
  }

  //Update objecct and the view after update modal successfully executed
  updtData(updatedData) {
   let oldData = this.Users.find(ud => ud.id == updatedData.id) 

   for (var okey in oldData ) {
     if(oldData.hasOwnProperty(okey)) {
        for(var nkey in updatedData) {
          if(updatedData.hasOwnProperty(nkey)) {
            if(okey == nkey) {
              oldData[okey] = updatedData[nkey];
            }
          }
        }
     }
   }
  }

  showContent() {
    this.show = true;
  }

  adminConvertToString(user: IUser): string {
    if(user.adminRole == false) {
      return "User";
    } else {
      return "Admin";
    }
  }

}

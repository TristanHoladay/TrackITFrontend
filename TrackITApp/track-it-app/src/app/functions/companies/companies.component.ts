import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from 'src/app/services/company.service';
import { ICompany } from 'src/app/interfaces/icompany';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/interfaces/iuser';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies: ICompany[] = [];
  show: boolean = false;
  admin: boolean = false;

  constructor(
    private http: HttpClient,
    private compService: CompanyService,
    private authService: AuthService
  ) { }

  addCompany: ICompany =  {
    id: 1,
    name: "",
    status: "",
    compT: null
  }


  ngOnInit() {
    this.compService.getAllCompanies().subscribe(data => {
      this.companies = data;
    });

    if(localStorage.getItem("role") == "admin"){
      this.admin = true;
    }
  
  }

   //Update object list to force onChangeDetection
   addData(newData) {
    this.companies.push(newData);
  }

  //Update objecct and the view after update modal successfully executed
  updtData(updatedData) {
   let oldData = this.companies.find(ud => ud.id == updatedData.id) 

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

}

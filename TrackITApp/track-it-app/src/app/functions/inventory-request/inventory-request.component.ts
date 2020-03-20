import { Component, OnInit } from '@angular/core';
import { IRequest } from 'src/app/interfaces/irequest';
import { InventoryrequestService } from 'src/app/services/inventoryrequest.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/dataservice.service';

@Component({
  selector: 'app-inventory-request',
  templateUrl: './inventory-request.component.html',
  styleUrls: ['./inventory-request.component.css']
})
export class InventoryRequestComponent implements OnInit {
  requests: IRequest[] = [];
  dataSubject: any = {};
  show: boolean = false;

  constructor(
    private reqService: InventoryrequestService,
    private router: Router,
    private dService: DataService
  ) { }

  ngOnInit() {
    this.reqService.getAllRequests().subscribe(data => {
      this.requests = data;
    });

    //using behaviour subject service for updating view after new object is created from sibling component
    this.dService.currentData.subscribe(dataSub => {
      this.dataSubject = dataSub
      if(this.dataSubject != null) {
        this.requests.push(this.dataSubject);
      }
    });
  }

  //Update objecct and the view after update modal successfully executed
  updtData(updatedData) {
   let oldData = this.requests.find(ud => ud.id == updatedData.id) 

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

  create() {
    this.router.navigateByUrl("create-request");
  }

  showContent() {
    this.show = true;
  }

}

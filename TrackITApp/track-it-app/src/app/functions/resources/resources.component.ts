import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Iitem } from 'src/app/interfaces/iitem';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  admin: boolean = false;
  items: Iitem[] = [];
  dataSubject: any = {};
  show: boolean = false;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private dService: DataService
  ) { }

  ngOnInit() {
    this.itemService.getAllItems(1).subscribe(data => {
      this.items = data;
    });

    //using behaviour subject service for updating view after new object is created from sibling component
    this.dService.currentData.subscribe(dataSub => {
      this.dataSubject = dataSub
      if(this.dataSubject != null) {
        this.items.push(this.dataSubject);
      }
    });

    if(localStorage.getItem("role") == "admin") {
      this.admin = true;
    }
  
  }

  create(){
    this.router.navigate(['create-item']);
  }

  updtData(updatedData) {
    let oldData = this.items.find(ud => ud.id == updatedData.id) 
 
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

  ticketNum(item): any {
    return item.useTicketId > 0 ? item.useTicketId : "N/A";
  }
  

}

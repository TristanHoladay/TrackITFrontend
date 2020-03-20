import { Component, OnInit } from '@angular/core';
import { UseticketService } from 'src/app/services/useticket.service';
import { IjobTicket } from 'src/app/interfaces/ijob-ticket';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-job-tickets',
  templateUrl: './job-tickets.component.html',
  styleUrls: ['./job-tickets.component.css']
})
export class JobTicketsComponent implements OnInit {
  tickets: IjobTicket[] = [];
  dataSubject: any = {};
  show: boolean = false;


  constructor(
    private ticketService: UseticketService,
    private router: Router,
    private dService: DataService
  ) { }

  ngOnInit() {
    this.ticketService.getAllTickets().subscribe(data => {
      this.tickets = data;
    });
  
    //using behaviour subject service for updating view after new object is created from sibling component
    this.dService.currentData.subscribe(dataSub => {
      this.dataSubject = dataSub
      if(this.dataSubject != null) {
        this.tickets.push(this.dataSubject);
      }
    });
  }

create() {
  this.router.navigateByUrl("create-ticket");
}

updtData(updatedData) {
  let oldData = this.tickets.find(ud => ud.id == updatedData.id) 

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

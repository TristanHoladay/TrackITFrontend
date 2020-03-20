import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Ivehicles } from 'src/app/interfaces/ivehicles';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  admin: boolean = false;
  vehicles: Ivehicles[] = [];
  show: boolean = false;
  addVehicle: Ivehicles = {
    id: 1,
    name: "",
    model: "",
    licensePlate: "",
    status: "",
    notes: "",
    vehicleT: null
  }

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.vehicleService.getAllVehicles().subscribe(data => {
      this.vehicles = data;
    });

    if(localStorage.getItem("role") == "admin") {
      this.admin = true;
    }
  }

   //Update object list to force onChangeDetection
   addData(newData) {
    this.vehicles.push(newData);
  }

  //Update objecct and the view after update modal successfully executed
  updtData(updatedData) {
   let oldData = this.vehicles.find(ud => ud.id == updatedData.id) 

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

import { Component, OnInit } from '@angular/core';
import { IResourceType } from 'src/app/interfaces/resource-type';
import { ResourcetypeService } from 'src/app/services/resourcetype.service';

@Component({
  selector: 'app-resource-type',
  templateUrl: './resource-type.component.html',
  styleUrls: ['./resource-type.component.css']
})
export class ResourceTypeComponent implements OnInit {
  types: IResourceType[] = [];
  show: boolean = false;
  admin = false;
  addType: {
    id: 1,
    name: ""
  }

  constructor(
    private typeService: ResourcetypeService
  ) { }

  ngOnInit() {
    this.typeService.getAllResourceTypes().subscribe(data => {
      this.types = data;
    });

    if(localStorage.getItem("role") == "admin") {
      this.admin = true;
    }
  }

   //Update object list to force onChangeDetection
   addData(newData) {
    this.types.push(newData);
  }

  //Update objecct and the view after update modal successfully executed
  updtData(updatedData) {
   let oldData = this.types.find(ud => ud.id == updatedData.id) 

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

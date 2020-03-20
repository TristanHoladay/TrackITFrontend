import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './user.service';
import { CompanyService } from './company.service';
import { VehicleService } from './vehicle.service';
import { ItemService } from './item.service';
import { ResourcetypeService } from './resourcetype.service';
import { UseticketService } from './useticket.service';
import { InventoryrequestService } from './inventoryrequest.service';
import { UservehiclesService } from './uservehicles.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesArrayService {
  services: object[];

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private companyService: CompanyService,
    private vehicleService: VehicleService,
    private itemService: ItemService,
    private typeService: ResourcetypeService,
    private ticketService: UseticketService,
    private requestService: InventoryrequestService,
    private uservehiclesService: UservehiclesService
  ) { 
    this.services.push(companyService)
    this.services.push(userService)
    this.services.push(vehicleService)
    this.services.push(itemService)
    this.services.push(typeService)
    this.services.push(ticketService)
    this.services.push(requestService)
    this.services.push(uservehiclesService)
  }
}

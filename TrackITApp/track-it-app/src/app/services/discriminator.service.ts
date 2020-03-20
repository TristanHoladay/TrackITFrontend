import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { ICompany } from '../interfaces/icompany';
import { Ivehicles } from '../interfaces/ivehicles';
import { IRequest } from '../interfaces/irequest';
import { IUserVehicles } from '../interfaces/user-vehicles';
import { Iitem } from '../interfaces/iitem';
import { IjobTicket } from '../interfaces/ijob-ticket';
import { IResourceType } from '../interfaces/resource-type';
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
export class DiscriminatorService {
  formObject: any;

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private vehicleService: VehicleService,
    private itemService: ItemService,
    private typeService: ResourcetypeService,
    private ticketService: UseticketService,
    private requestService: InventoryrequestService,
    private uservehiclesService: UservehiclesService
  ) { }

  getObjectType(object: IUser | ICompany | Ivehicles | IRequest | Iitem | IUserVehicles | IjobTicket | IResourceType): object {
    if ("userT" in object) {
      return this.userService;
    }

    if ("compT" in object) {
      return this.companyService;
    }

    if ("vehicleT" in object) {
      return this.vehicleService;
    }

    if ("requestT" in object) {
      return this.requestService;
    }

    if ("itemT" in object) {
      return this.itemService;
    }

    if ("uvT" in object) {
     return this.uservehiclesService;
    }

    if ("ticketT" in object) {
      return this.ticketService;
    }

    if ("resourceTypeT" in object) {
       return this.typeService;
    }
  }
}

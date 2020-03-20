import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { CompanyService } from 'src/app/services/company.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ItemService } from 'src/app/services/item.service';
import { ResourcetypeService } from 'src/app/services/resourcetype.service';
import { UseticketService } from 'src/app/services/useticket.service';
import { InventoryrequestService } from 'src/app/services/inventoryrequest.service';
import { UservehiclesService } from 'src/app/services/uservehicles.service';
import { IUser } from 'src/app/interfaces/iuser';
import { ServicesArrayService } from 'src/app/services/services-array.service';
import { ICompany } from 'src/app/interfaces/icompany';
import { Ivehicles } from 'src/app/interfaces/ivehicles';
import { IRequest } from 'src/app/interfaces/irequest';
import { Iitem } from 'src/app/interfaces/iitem';
import { IUserVehicles } from 'src/app/interfaces/user-vehicles';
import { IjobTicket } from 'src/app/interfaces/ijob-ticket';
import { IResourceType } from 'src/app/interfaces/resource-type';
import { DiscriminatorService } from 'src/app/services/discriminator.service';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteModal implements OnInit {
  @Input() delObject: any;
  service: any;
  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private discService: DiscriminatorService
  ) { }

  ngOnInit() {
    this.service = this.discService.getObjectType(this.delObject);
  }

  deleteObject(delObject: any) {
    console.log(delObject.id);
    this.service.delete(delObject.id).subscribe(data => {
      console.log(data);
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}

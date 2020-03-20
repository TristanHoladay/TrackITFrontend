import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DiscriminatorService } from 'src/app/services/discriminator.service';

@Component({
  selector: 'update-modal',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateModal implements OnInit {

  @Input() updateObject: any;
  @Output() updated = new EventEmitter();

  form: FormGroup;
  objectProps: string[] = [];
  closeResult: string;
  modalClose: boolean = false;
  service: any;
  nonPrintProps: string[] = [
    "id",
    "fullName",
    "companyId",
    "userId", 
    "resourceTypeId", 
    "vehicleId", 
    "useTicketId", 
    "ticketT", 
    "itemT", 
    "compT",
    "requestT",
    "userT",
    "vehicleT",
    "resourceTypeT",
    "uvT"
  ];
  
  constructor(
    private modalService: NgbModal,
    private discService: DiscriminatorService
  ) { }

  ngOnInit() {
    const formDataObject = Object.keys(this.updateObject).reduce((formObj, prop) => {
      //if object property is not in non print array then add to object prop array,
      //which will output form fields to the view; 
      //also create Form Control that has required validator,
      //else just make a Form Control, with no required validator, for the object property
      if(!this.nonPrintProps.includes(prop)) {
        this.objectProps.push(prop);
        formObj[prop] = new FormControl(this.updateObject[prop], Validators.required)
      } else {
        formObj[prop] = new FormControl(this.updateObject[prop])
      }
      return formObj;
    }, {});

    this.form = new FormGroup(formDataObject);

    //use discriminator service to get object type and set correct object service
    this.service = this.discService.getObjectType(this.updateObject);
   
  }

  update(form) {
    if(form.valid) {
      var id = form.value.id;

      this.service.update(id, form.value).subscribe(data => {
       alert("Successful Object Update!")
       this.updated.emit(data);
      });
      this.modalClose = true;
    } else {
      alert("Form is missing required input. Please fill out all form fields.");
    }
  }

  inputTypeVal(prop: string): string {
    switch(prop) {
      case "password": {
        return "password";
      }
      case "email": {
        return "email";
      }
      default: {
        return "text";
      }
    }
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

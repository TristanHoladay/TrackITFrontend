import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators,  } from '@angular/forms';
import { DiscriminatorService } from 'src/app/services/discriminator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'creation-modal',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})


export class CreationComponent implements OnInit {

  @Input() creationObject: any;
  @Output() addedData = new EventEmitter();

  closeResult: string;
  modalClose: boolean = false;
  form: FormGroup;
  objectProps: string[] = [];
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
    private discService: DiscriminatorService,
    private router: Router
  ) { }

  ngOnInit() {
    const formDataObject = Object.keys(this.creationObject).reduce((formObj, prop) => {
      //if object property is not in non print array then add to object prop array,
      //which will output form fields to the view; 
      //also create Form Control that has required validator,
      //else just make a Form Control, with no required validator, for the object property
      if(!this.nonPrintProps.includes(prop)) {
        this.objectProps.push(prop);
        formObj[prop] = new FormControl(this.creationObject[prop], Validators.required)
      } else {
        formObj[prop] = new FormControl(this.creationObject[prop])
      }
      return formObj;
    }, {});

    this.form = new FormGroup(formDataObject);

    //use discriminator service to get object type and set correct object service
    this.service = this.discService.getObjectType(this.creationObject);
   
  }

  create(form) {
    if(form.valid) {
      this.service.add(form.value).subscribe(data => {
        alert("Successful Object Creation!");
        this.addedData.emit(data);
      });
      this.modalClose = true;
    } else {
      alert("Form is missing required input. Please fill out all form fields.");
      return null;
    }

    //this.addedData.emit()
    
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

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ItemService } from 'src/app/services/item.service';
import { CompanyService } from 'src/app/services/company.service';
import { ResourcetypeService } from 'src/app/services/resourcetype.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'item-creation',
  templateUrl: './item-creation.component.html',
  styleUrls: ['./item-creation.component.css']
})
export class ItemCreationComponent implements OnInit {
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  model: any = {
    id: 1,
    name: "",
    description: "",
    amount: null,
    cost: null,
    storageLocation: "",
    companyId: null,
    company: "",
    resourceTypeId: null,
    resourceType: "",
    vehicleId: 0,
    vehicle: "",
    useTicketId: 0,
    useTicket: "",
    itemT: ""
  }

  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Item(s) Name',
        required: true
      },
      validation: {
        messages: {
          required: 'Please give resource(s) a name.'
        }
      }
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'Description',
        max: 250
      }
    },
    {
      key: 'amount',
      type: 'input',
      templateOptions: {
        label: 'Amount',
        type: 'number',
        required: true
      },
      validation: {
        messages: {
          required: 'Please specify the number of units for this resource(s).'
        }
      }
    },
    {
      key: 'cost',
      type: 'input',
      templateOptions: {
        label: 'Cost Per Unit',
        type: 'number',
        required: true
      },
      validation: {
        messages: {
          required: 'Please add a cost per unit for this resource(s).'
        }
      }
    },
    {
      key: 'storageLocation',
      type: 'input',
      templateOptions: {
        label: 'Storage Location (i.e Armory, Cage, Vehicle)',
        type: 'string',
        required: true,
        max: 60
      },
      validation: {
        messages: {
          required: 'Please give a storage location for the resource.'
        }
      }
    },
    {
      key: 'companyId',
      type: 'select',
      templateOptions: {
        label: 'Company',
        options: this.companyService.getAllCompanies(),
        valueProp: 'id',
        labelProp: 'name',
        required: true
      },
      validation: {
        messages: {
          required: 'Please select a company to tie this resource to.'
        }
      }
    },
    {
      key: 'resourceTypeId',
      type: 'select',
      templateOptions: {
        label: 'Resource Type',
        options: this.rtService.getAllResourceTypes(),
        valueProp: 'id',
        labelProp: 'name',
        required: true
      },
      validation: {
        messages: {
          required: 'Please select a resource type for this resource(s).'
        }
      }
    },
    {
      key: 'vehicleId',
      type: 'select',
      templateOptions: {
        label: 'Vehicle (If stored on Vehicle)',
        options: this.vehicleService.getAllVehicles(),
        valueProp: 'id',
        labelProp: 'name'
      }
    }
  ];
  

  constructor(
    private itemService: ItemService,
    private companyService: CompanyService,
    private rtService: ResourcetypeService,
    private vehicleService: VehicleService,
    private router: Router,
    private dService: DataService
  ) { }

  ngOnInit() {}

  onSubmit(form) {
    if(form.valid) {
      this.itemService.add(form.value).subscribe(data => {
        this.dService.changeDataSub(data);
        alert("Successfully created new item!");
      });
      this.router.navigate(['resources']);
    } else {
      alert('Form is missing required values');
    }
  }

}

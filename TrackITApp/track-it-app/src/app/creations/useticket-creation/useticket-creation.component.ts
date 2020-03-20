import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Router } from '@angular/router';
import { startWith, switchMap } from 'rxjs/operators';

import { ItemService } from 'src/app/services/item.service';
import { CompanyService } from 'src/app/services/company.service';
import { ResourcetypeService } from 'src/app/services/resourcetype.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { UseticketService } from 'src/app/services/useticket.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { DataService } from 'src/app/services/dataservice.service';


@Component({
  selector: 'useticket-creation',
  templateUrl: './useticket-creation.component.html',
  styleUrls: ['./useticket-creation.component.css']
})

export class UseticketCreationComponent implements OnInit {
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  items: [];
  token: string;

  model: any = {
    id: 1,
    tisNumber: "",
    date: Date.now(),
    notes: "",
    userId: "",
    user: "",
    companyId: null,
    company: "",
    ticketT: "",
    itemId: null
  }

  fields: FormlyFieldConfig[] = [
    {
      key: 'tisNumber',
      type: 'input',
      templateOptions: {
        label: 'ConnectWise Ticket #',
        type: 'number',
        required: true
      },
      validation: {
        messages: {
          required: 'Please specify the ConnectWise ticket this use ticket relates to.'
        }
      }
    },
    {
      key: 'notes',
      type: 'textarea',
      templateOptions: {
        label: 'Notes',
        max: 300
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
          required: 'Please select the company this resource is being used for.'
        }
      }
    },
    {
      key: 'itemId',
      type: 'select',
      templateOptions: {
        label: 'Item(s) being used',
        options: [],
        valueProp: 'id',
        labelProp: 'name'
      },
      expressionProperties: {
        "templateOptions.disabled": model => !model.companyId,
        "model.itemId": "!model.companyId ? null : model.itemId"
      },
      hooks: {
        onInit: (field: FormlyFieldConfig) => {
          field.templateOptions.options = field.form
          .get('companyId')
          .valueChanges.pipe(
            startWith(this.model.companyId),
            switchMap(companyId => this.itemService.getAllItems(companyId))
          );
        }
      },
      validation: {
        messages: {
          required: 'Please select the item(s) needed for this Use Ticket.'
        }
      }
    }
  ];
  

  constructor(
    private authService: AuthService,
    private itemService: ItemService,
    private ticketService: UseticketService,
    private companyService: CompanyService,
    private rtService: ResourcetypeService,
    private vehicleService: VehicleService,
    private router: Router,
    private dService: DataService
  ) { }

  ngOnInit() {
    this.token = this.authService.decodeToken();
  }

  onSubmit(form) {

    if(form.valid) {

      //Update the selected item being used for ticket
      this.itemService.getItemById(form.value.itemId).subscribe(item => {
        this.itemService.update(item.id, item);
      });

      form.value.userId = this.token['sub'];
      delete form.value.itemId
      
      this.ticketService.add(form.value).subscribe(data => {
        this.dService.changeDataSub(data);
        alert("Successfully created new ticket!");
      });
      this.router.navigate(['tickets']);
    } else {
      alert('This form is missing required values');
    }
  }

}

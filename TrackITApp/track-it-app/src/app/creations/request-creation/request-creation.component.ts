import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { CompanyService } from 'src/app/services/company.service';
import { ResourcetypeService } from 'src/app/services/resourcetype.service';
import { ICompany } from 'src/app/interfaces/icompany';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { InventoryrequestService } from 'src/app/services/inventoryrequest.service';
import { DataService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'request-creation',
  templateUrl: './request-creation.component.html',
  styleUrls: ['./request-creation.component.css']
})
export class RequestCreationComponent implements OnInit {
form = new FormGroup({});
options: FormlyFormOptions = {};
token: string;
dataSubject: any = {};

  model = {
    id: 1,
    details: "",
    date: Date.now(),
    complete: false,
    companyId: null,
    company: "",
    resourceTypeId: null,
    resourceType: "",
    userId: "",
    user: "",
    requestT: "",
  }

  fields: FormlyFieldConfig[] = [
    {
      key: 'details',
      type: 'textarea',
      templateOptions: {
        label: 'Request Details',
        required: true
      },
      validation: {
        messages: {
          required: 'Please give a summary of this inventory request.'
        }
      }
    },
    {
      key: 'companyId',
      type: 'select',
      templateOptions: {
        required: true,
        label: 'Company',
        options: this.companyService.getAllCompanies(),
        valueProp: 'id',
        labelProp: 'name',
        
      },
      validation: {
        messages: {
          required: 'Please select the company this request is for.'
        }
      }
    },
    {
      key: 'resourceTypeId',
      type: 'select',
      templateOptions: {
        required: true,
        label: 'Resource Type',
        options: this.rtService.getAllResourceTypes(),
        valueProp: 'id',
        labelProp: 'name',
      },
      validation: {
        messages: {
          required: 'Please select the appropriate resource type.'
        }
      }
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private requestService: InventoryrequestService,
    private companyService: CompanyService,
    private rtService: ResourcetypeService,
    private dService: DataService
  ) { }

  ngOnInit() {
    this.token = this.authService.decodeToken();
  }

  onSubmit(form) {
    if(form.valid) {
      form.value.userId = this.token['sub'];
      this.requestService.add(form.value).subscribe(data => {
        this.dService.changeDataSub(data);
        alert("Successfully created new request!");
      });
    this.router.navigate(['requests']);
    } else {
      alert('This form is missing required values.');
    }
    
  }

}

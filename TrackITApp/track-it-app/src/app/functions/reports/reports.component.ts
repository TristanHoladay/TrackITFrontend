import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { CompanyService } from 'src/app/services/company.service';
import { ItemService } from 'src/app/services/item.service';
import { UseticketService } from 'src/app/services/useticket.service';
import { InventoryrequestService } from 'src/app/services/inventoryrequest.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ResourcetypeService } from 'src/app/services/resourcetype.service';
import { ICompany } from 'src/app/interfaces/icompany';
import { IUser } from 'src/app/interfaces/iuser';
import { IResourceType } from 'src/app/interfaces/resource-type';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})


export class ReportsComponent implements OnInit {

  company: boolean = false;
  user: boolean = false;
  resourceType: boolean = false;
  selectedId: boolean = false;
  objectId: any;
  disList: string;
  disObject: string;
  disDT: string;


  dataSource: MatTableDataSource<Object>;
  dataService: any;
  rows: object[];
  columns: string[];
  objectProp: string[];
  myControl = new FormControl();

  companies: ICompany[];
  users: IUser[];
  types: IResourceType[];

  nonPrintProps: string[] = [
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
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private companyService: CompanyService,
    private itemService: ItemService,
    private ticketService: UseticketService,
    private requestService: InventoryrequestService,
    private vehicleService: VehicleService,
    private rtService: ResourcetypeService,
  ) { }

  ngOnInit() {
    // this.route.paramMap.subscribe((params: ParamMap) => {

    // })
  }

  //Get list of selected data sources
  fetchSource(object: string) {
    
    this.disList = object;

    if(object == "company") {
      this.getCompanies();
      this.setViewTrue(object);
    }

    if(object == "user") {
      this.getUsers();
      this.setViewTrue(object);
    }

    if(object == "resourcetype") {
      this.getTypes();
      this.setViewTrue(object);
    }
  }

  setViewTrue(source: string) {
    switch(source) {
      case("company") :
        this.company = true;
        this.user = false;
        this.resourceType = false;
        break;
      case("user") :
        this.user = true;
        this.company = false;
        this.resourceType = false;
        break;
      case("resourcetype") :
        this.resourceType = true;
        this.company = false;
        this.user = false;
        break;
      default :
        this.company = false;
        this.user = false;
        this.resourceType = false;
        break;
    }
  }

  getCompanies() {
    this.companyService.getAllCompanies().subscribe(data => {
      this.companies = data;
    });
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  getTypes() {
    this.rtService.getAllResourceTypes().subscribe(data => {
      this.types = data;
    })
  }

  //Get id of dataSource object to later pass to observable
  catchIdAndName(id: any, name: string) {
    this.objectId = id;
    this.selectedId = true;
    this.disObject = name;
  }
  
  //Get Service that matches selected parameters
  defineDataService(type: string) {
    this.disDT = type;

    switch(type) {

      case("tickets") :
        if(this.company) {
          this.dataService = this.companyService.getTicketsbyCompany(this.objectId);
        } else {
          this.dataService = this.userService.getTicketsByUser(this.objectId);
        }
        break;
      
      case("requests") :
        if(this.company) {
          this.dataService = this.companyService.getRequestsByCompany(this.objectId);
        } else {
          this.dataService = this.userService.getRequestsByUser(this.objectId);
        }
        break;

      case("items") :
        if(this.company) {
          this.dataService = this.itemService.getAllItems(this.objectId);
          console.log("true");
        } else {
          this.dataService = this.itemService.getItemById(this.objectId);
          console.log("this");
        }
        break;
      
      default: 
       alert("Cannot set data service.");
       this.clearDataTableandView();
       break;
    }

    this.fetchData();
  }

  fetchData()  {
    let objArr = [];
    this.dataService.subscribe(data => {

      if(data.length == 0) {
        alert("No data exists for selected options.");
        this.clearDataTableandView();
      } else {
        data.forEach(dataObject => {
          this.removeProps(dataObject) //remove unwanted properties from displaying
         objArr.push(dataObject);
       });
      }
    });

    this.rows = objArr;
  }

  removeProps(dataObject: object): Object {
    for (var key in dataObject) {
      if (dataObject.hasOwnProperty(key)) {
        for (var i = 0; i < this.nonPrintProps.length; i++) {
          if (key == this.nonPrintProps[i]) {
            delete dataObject[key];
          }
        }
      }
    }
    return dataObject;
  } 

  GenerateColumns() {
    this.columns = Object.keys(this.rows[0]);
    this.createDataSource();
  }

  createDataSource() {
    this.dataSource = new MatTableDataSource<Object>(this.rows);
  }

  clearDataTableandView() {
    this.company = false;
    this.user = false;
    this.resourceType = false;
    this.selectedId = false;
    this.rows.length = 0;
    this.columns.length = 0;
    this.createDataSource();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


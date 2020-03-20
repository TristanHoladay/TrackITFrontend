import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';
import { RoleGuardService } from './services/role-guard.service';

import { LoginComponent } from './login/login.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './functions/users/users.component';
import { VehiclesComponent } from './functions/vehicles/vehicles.component';
import { ResourcesComponent } from './functions/resources/resources.component';
import { ReportsComponent } from './functions/reports/reports.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { CompaniesComponent } from './functions/companies/companies.component';
import { InventoryRequestComponent } from './functions/inventory-request/inventory-request.component';
import { JobTicketsComponent } from './functions/job-tickets/job-tickets.component';
import { UseticketCreationComponent } from './creations/useticket-creation/useticket-creation.component';
import { ItemCreationComponent } from './creations/item-creation/item-creation.component';
import { RequestCreationComponent } from './creations/request-creation/request-creation.component';
import { ResourceTypeComponent } from './functions/resource-type/resource-type.component';


const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { 
    path: 'home',
    component: AdminHomePageComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
   }, 
  { path: 'user',
    component: UserHomePageComponent,
    canActivate: [AuthGuardService]
   },
  { path: 'users',
    component: UsersComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  { path: 'vehicles',
    component: VehiclesComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'companies',
    component: CompaniesComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'requests',
    component: InventoryRequestComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'create-request', 
    component: RequestCreationComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'resources',
    component: ResourcesComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'create-item', 
    component: ItemCreationComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  { path: 'resourcetype',
    component: ResourceTypeComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'reports',
    component: ReportsComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  { path: 'tickets',
    component: JobTicketsComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'create-ticket',
    component: UseticketCreationComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

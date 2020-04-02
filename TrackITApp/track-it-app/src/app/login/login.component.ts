import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { first, filter } from 'rxjs/operators';
import { RoleGuardService } from '../services/role-guard.service';
import { Observable } from 'rxjs';
//import { IsLoadingService } from '@service-work/is-loading';
import {LoadingIndicatorModule, startLoadingIndicator, stopLoadingIndicator} from '@btapai/ng-loading-indicator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: any;
  loading: boolean;

  //Progress Spinner
  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';

  @startLoadingIndicator
  triggerLoadingIndicator() {
    setTimeout(this.triggerLoadingIndicatorStop.bind(this), 500);
  }

  @stopLoadingIndicator
  triggerLoadingIndicatorStop() {
    console.log('Stopped');
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private roleService: RoleGuardService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl()
    });

  }

  onSubmit(loginData) {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(loginData.email, loginData.password)
      .pipe(first())
      .subscribe(
        data => {
          if(data.adminRole) {
            this.router.navigateByUrl("home");
          } else {
            this.router.navigateByUrl("user");
          }
        },
        error => {
          alert("Oops! You might have incorrectly typed your password, or you don't have permission to access this site. If you need help, please contact your system admin.");
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { decode } from 'jwt-decode';
import { RoleGuardService } from '../services/role-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: any;
  loading: boolean;

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

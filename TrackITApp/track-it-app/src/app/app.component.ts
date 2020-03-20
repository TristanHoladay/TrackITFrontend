import { Component } from '@angular/core';
import { AuthService } from './services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TrackIT';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logOut() {
    this.authService.logout;
    this.router.navigateByUrl("login");
  }

}

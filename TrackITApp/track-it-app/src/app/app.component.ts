import { Component } from '@angular/core';
import { AuthService } from './services/auth-service.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Observable } from 'rxjs';
import { IsLoadingService } from '@service-work/is-loading';
import { filter } from 'rxjs/operators';
//import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TrackIT';
  isLoading: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private isLoadingService: IsLoadingService
  ) {}


  ngOnInit() {
    this.isLoading = this.isLoadingService.isLoading$();

    this.router.events
      .pipe(
        filter(
          event =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError,
        ),
      )
      .subscribe(event => {
        if(event instanceof NavigationStart) {
          this.isLoadingService.add();
          return;
        }

        this.isLoadingService.remove();
      });
  }




  logOut() {
    this.authService.logout;
    this.router.navigateByUrl("login");
  }

}

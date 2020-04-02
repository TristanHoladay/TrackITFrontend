import { Component } from '@angular/core';
import { AuthService } from './services/auth-service.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { IsLoadingService } from '@service-work/is-loading';
import { filter } from 'rxjs/operators';
import { startLoadingIndicator, stopLoadingIndicator } from '@btapai/ng-loading-indicator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TrackIT';

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
    private router: Router,
    private isLoadingService: IsLoadingService
  ) {}


  ngOnInit() {}

}

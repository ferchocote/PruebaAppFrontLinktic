import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { LoginService } from './pages/login/service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router, private authService: LoginService) {
    // Redirigir al login si no está autenticado
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (!this.authService.currentUserValue && event.url !== '/login') {
          this.router.navigate(['/login']);
        }
      }
    });
  }
}

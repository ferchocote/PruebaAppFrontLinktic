import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../pages/login/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.currentUserValue) {
      return true;  // Deja pasar al usuario
    } else {
      this.router.navigate(['/product']);  // Redirige al login si no está autenticado
      return false;
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './service/login.service';
import { Login } from './models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  public login!: Login;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.login = {
        user: credentials.username,
        password: credentials.password,
      };

      this.loginService.getLogin(this.login)
        .subscribe(resp => {
          if (resp.isSuccessful) {
            this.router.navigate(['/product']).then(success => {
              console.log(success ? 'Navegación exitosa' : 'Error en la navegación');
            });
          }
        });
    } else {
      console.log('Formulario inválido');
    }
  }
}

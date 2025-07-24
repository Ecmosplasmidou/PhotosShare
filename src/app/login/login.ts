import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string = '/facesnaps';
  showAuthMessage: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Récupérer l'URL de retour et le message des paramètres de requête
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/facesnaps';
    this.showAuthMessage = this.route.snapshot.queryParams['message'] === 'auth-required';
  }

  onSubmitForm(): void {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.authService.login(formValue.username, formValue.email);
      // Rediriger vers l'URL demandée originalement
      this.router.navigateByUrl(this.returnUrl);
    }
  }
}

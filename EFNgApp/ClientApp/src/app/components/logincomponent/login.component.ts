import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import * as jwt_decode from "jwt-decode";
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitClick = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private formBuilder: FormBuilder, private router: Router,
    private activatedRoute: ActivatedRoute, private authsvc: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.authsvc.logout();

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';    
  }

  get formData() { return this.loginForm.controls; }

  onLogin() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.submitClick = true;

    this.authsvc.login(this.formData.username.value, this.formData.password.value)
      .pipe(first())
      .subscribe(data => {
        this.router.navigate(['/fetch-employee']);
      }),
      error => {
        this.error = error;
        this.submitClick = false;
      }
  }  
}

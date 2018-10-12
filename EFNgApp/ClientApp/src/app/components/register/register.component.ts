import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Registration } from '../../services/registration.service';

@Component({
  templateUrl: './register.component.html'
})

export class RegisterEmployeeComponent implements OnInit {
  userForm: FormGroup;
  title: string = "Register";
  
  errorMessage: any;
  

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _registerservice: Registration, private _router: Router) {
    

    this.userForm = this._fb.group({     
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      emailaddress: ['', [Validators.required]],
      role: ['', [Validators.required]]
    })
  }

  ngOnInit() {

  }

  save() {

    if (!this.userForm.valid) {
      return;
    }

    if (this.title == "Register") {
      this._registerservice.saveUser(this.userForm.value)
        .subscribe((data) => {
          this._router.navigate(['/login']);
        }, error => this.errorMessage = error)
    }    
  }

  cancel() {
    this._router.navigate(['/login']);
  }

  get username() { return this.userForm.get('username'); }
  get password() { return this.userForm.get('password'); }
  get emailaddress() { return this.userForm.get('emailaddress'); }
  get role() { return this.userForm.get('role'); }
}  

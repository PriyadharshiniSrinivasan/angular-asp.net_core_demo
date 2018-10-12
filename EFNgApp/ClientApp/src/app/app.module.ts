import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { EmployeeService } from './services/empservice.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthourizationCheck } from './services/authorizationcheck.service';
import { Registration } from './services/registration.service';

import { ErrorInterceptor } from './Interceptor/errorInterceptor.interceptor';
import { httpInterceptor } from './Interceptor/httpInterceptor.interceptor';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FetchEmployeeComponent } from './components/fetchemployee/fetchemployee.component';  
import { createemployee } from './components/addemployee/AddEmployee.component';
import { LoginComponent } from './components/logincomponent/login.component';
import { RegisterEmployeeComponent } from './components/register/register.component';

@NgModule({  
    declarations: [  
        AppComponent,  
        NavMenuComponent,  
        HomeComponent,  
        FetchEmployeeComponent,  
        createemployee,
        LoginComponent,
        RegisterEmployeeComponent
    ],  
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        HttpModule,
        FormsModule,  
        ReactiveFormsModule,  
        RouterModule.forRoot([  
            { path: '', redirectTo: 'home', pathMatch: 'full'},  
            { path: 'home', component: HomeComponent },  
            { path: 'fetch-employee', component: FetchEmployeeComponent, canActivate: [AuthourizationCheck] },  
            { path: 'register-employee', component: createemployee, canActivate: [AuthourizationCheck] },  
            { path: 'employee/edit/:id', component: createemployee, canActivate: [AuthourizationCheck] },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterEmployeeComponent },
            { path: 'logout', component: LoginComponent, canActivate: [AuthourizationCheck] },
            { path: '**', redirectTo: 'home' }  
      ]),
        NgxPermissionsModule.forRoot()
    ],
    bootstrap : [AppComponent],  
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    EmployeeService, HttpModule, AuthenticationService, AuthourizationCheck, Registration]  
})  
export class AppModule { }

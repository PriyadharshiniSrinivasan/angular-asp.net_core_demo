import { Component, Inject } from '@angular/core';  
import { Http, Headers } from '@angular/http';  
import { Router, ActivatedRoute } from '@angular/router';  
import { EmployeeService } from '../../services/empservice.service'
import { NgxPermissionsService } from 'ngx-permissions';
  
@Component({  
    templateUrl: './fetchemployee.component.html'  
})  
  
export class FetchEmployeeComponent {  
  role: string;
  public empList: EmployeeData[];
  
  public tokenvalue = localStorage.getItem('Role');
  
  
  constructor(public http: Http, private _router: Router, private _employeeService: EmployeeService, private permissionsService: NgxPermissionsService) {  
    this.getEmployees();
    this.role = JSON.parse(this.tokenvalue);
    console.log(this.role);
  }

  
  
    getEmployees() {  
        this._employeeService.getEmployees().subscribe(  
            data => this.empList = data  
        )  
    }  
  
    delete(employeeID) {  
        var ans = confirm("Do you want to delete customer with Id: " + employeeID);  
        if (ans) {  
            this._employeeService.deleteEmployee(employeeID).subscribe((data) => {  
                this.getEmployees();  
            }, error => console.error(error))  
        }  
    }  
}  
  
interface EmployeeData {  
    employeeId: number;  
    name: string;  
    gender: string;  
    city: string;  
    department: string;    
} 

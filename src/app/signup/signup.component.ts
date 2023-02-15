import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import {environment} from '../../environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  form: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  submit = () => {
    console.log('name' , this.name);
    console.log('email' , this.email);
    console.log('password' , this.password);
    axios.post(environment.baseURL + `users/register` , {name : this.name, email : this.email, password : this.password})
      .then(res => {
        if (res.data.status) {
          this.makeAlert('success' , 'Operation' , res.data.successMessage );
          this.router.navigate(['/signin']);
        }else {
          this.makeAlert('error' , 'Operation' , res.data.errorMessage );
        }
      }).catch(err => {
          this.makeAlert('error' , 'Operation' , err );
      });
  }
  makeAlert(type , title , message) {
    Swal.fire({
      title,
      text: message,
      icon: type,
      confirmButtonText: 'ok'
    });
  }
}

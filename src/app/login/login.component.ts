import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {UserSession} from '../../services/UserSession';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loading = false;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit = () => {
    this.loading = true;
    axios.post(environment.baseURL + `users/auth` , {email : this.email , password : this.password})
      .then(res => {
        this.makeAlert('success' , 'Success' , res.data.successMessage);
        UserSession.setToken(res.data.token);
        UserSession.saveUserData(res.data.userInfo)
          .then(saved => {
            if (saved) {
              if (UserSession.isAuth()) {
                  this.router.navigate(['/home']);
              }else {
                  this.router.navigate(['/signin']);
              }
            }
          });
      }).catch(err => {
        this.makeAlert('error' , 'Error' , err);
    });
  }

  makeAlert(type, title, message) {
    Swal.fire({
      title,
      text: message,
      icon: type,
      confirmButtonText: 'ok'
    });
  }
}

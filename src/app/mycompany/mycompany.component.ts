import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {UserSession} from '../../services/UserSession';
import Swal from 'sweetalert2';
import {CompanyModel} from '../models/company.model';

@Component({
  selector: 'app-mycompany',
  templateUrl: './mycompany.component.html',
  styleUrls: ['./mycompany.component.css']
})
export class MycompanyComponent implements OnInit {
  name: String;
  email: String;
  companies: CompanyModel[] = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.fetchMyCompanies();
  }


  submit = () => {
    axios.post(environment.baseURL + 'companies/add' ,
      {name : this.name , email : this.email, userId : UserSession.getUserData().id} ,
      {headers: {Authorization: `Bearer ${UserSession.getUserToken()}`}})
      .then(res => {
        if (res.data.status) {
          this.makeAlert('success' , 'Operation' , res.data.successMessage );
          this.fetchMyCompanies();
          this.name  = '';
          this.email = '';
        }else {
          this.makeAlert('error' , 'Operation' , res.data.errorMessage );
        }
      }).catch(err => {
      this.makeAlert('error' , 'Error' , err);
    });
  }

  fetchMyCompanies = () => {
    axios.get(environment.baseURL + `companies/fetch-all?userId=${UserSession.getUserData().id}` ,
      {headers: {'Authorization': `Bearer ${UserSession.getUserToken()}`}})
      .then(res => {
        if (res.data.status) {
          this.companies = res.data.response;
        }else {
          this.makeAlert('error' , 'Error Fetching my companies' , res.data.errorMessage );
        }
      }).catch(err => {
      this.makeAlert('error' , 'Error' , err);
    });
  }

  navigateToDetails = (companyId) => {
    this.router.navigate(['profile' , companyId]);
  }

  makeAlert = (type, title, message) =>  {
    Swal.fire({
      title,
      text: message,
      icon: type,
      confirmButtonText: 'ok'
    });
  }
}

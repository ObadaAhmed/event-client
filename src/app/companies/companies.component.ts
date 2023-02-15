import { Component, OnInit } from '@angular/core';
import {CompanyModel} from '../models/company.model';
import {ActivatedRoute, Router} from '@angular/router';
import axios from 'axios';
import {environment} from '../../environments/environment';
import Swal from 'sweetalert2';
import {UserSession} from '../../services/UserSession';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
   companies: CompanyModel[] = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.fetchALlCompanies();
  }

  fetchALlCompanies = () => {
    axios.get(environment.baseURL + 'companies/fetch-all' , {headers: {'Authorization': `Bearer ${UserSession.getUserToken()}`}})
      .then(res => {
        if (res.data.status) {
          this.companies = res.data.response;
        }else {
          this.makeAlert('error' , 'Operation' , res.data.errorMessage );
        }
      }).catch(err => {
      this.makeAlert('error' , 'Error' , err);
     });
  }

  follow = (companyId) => {
    axios.post(environment.baseURL + `companies/follow-company` , {userId : UserSession.getUserData().id , companyId} , {headers: {'Authorization': `Bearer ${UserSession.getUserToken()}`}})
      .then(res => {
        if (res.data.status) {
          this.makeAlert('success' , 'Operation' , res.data.successMessage );
        }else {
          this.makeAlert('error' , 'Operation' , res.data.errorMessage );
        }
      }).catch(err => {
      this.makeAlert('error' , 'Error' , err);
    });
  }

  navigateToCompaniesEvent = (companyId) => {
      this.router.navigate(['events' , companyId ]);
  }
  makeAlert = (type, title, message) => {
    Swal.fire({
      title,
      text: message,
      icon: type,
      confirmButtonText: 'ok'
    });
  }

}

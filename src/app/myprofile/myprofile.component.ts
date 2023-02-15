import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserSession} from '../../services/UserSession';
import axios from 'axios';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {CompanyModel} from '../models/company.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  ownerName: String;
  company: any;
  ownerId: String;
  companyId: number;
  description: string;
  location: String;
  logo: String;
  updateProfile = false;
  EventDescription: String;
  name: String;
  startDate: Date;
  endDate: Date;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.ownerName = UserSession.getUserData().name;
    this.ownerId = UserSession.getUserData().id;
    this.companyId = this.route.snapshot.params.id;
    this.fetchCompanyDetails();
  }

  fetchCompanyDetails = () => {
    axios.get(environment.baseURL + `companies/fetch-all?companyId=${this.companyId}`,
      {headers: {Authorization: `Bearer ${UserSession.getUserToken()}`}})
      .then(res => {
        if (res.data.status) {
          console.log('company : ' , res.data.response[0]);
          this.company = res.data.response[0];
        }else {
          this.makeAlert('error' , 'Error Fetching my companies details' , res.data.errorMessage );

        }
      }).catch(err => {
      this.makeAlert('error' , 'Error' , err);
    });
  }

  makeAlert = (type, title, message) =>  {
    Swal.fire({
      title,
      text: message,
      icon: type,
      confirmButtonText: 'ok'
    });
  }

  saveProfile = () => {
    axios.post(environment.baseURL +
      `companies/create-profile` , {description: this.description , location: this.location , logo: this.logo , companyId:  this.companyId},
      {headers: {Authorization: `Bearer ${UserSession.getUserToken()}`}})
      .then(res => {
        if (res.data.status) {
          this.fetchCompanyDetails();
        }else {
          this.makeAlert('error' , 'Error Fetching my companies details' , res.data.errorMessage );
        }
      }).catch(err => {
      this.makeAlert('error' , 'Error' , err);
    });
  }
  updateComProfile = () => {
    axios.put(environment.baseURL +
      `companies/update-profile` , {description: this.description , location: this.location , logo: this.logo , companyId:  this.companyId},
      {headers: {Authorization: `Bearer ${UserSession.getUserToken()}`}})
      .then(res => {
        if (res.data.status) {
          this.fetchCompanyDetails();
        }else {
          this.makeAlert('error' , 'Error Fetching my companies details' , res.data.errorMessage );
        }
      }).catch(err => {
      this.makeAlert('error' , 'Error' , err);
    });
  }

  saveEvent = () => {
      axios.post(environment.baseURL + `events/add` ,
        {name : this.name , description : this.EventDescription ,
          start_date : this.startDate , end_date : this.endDate , companyId : this.companyId},
        {headers: {Authorization: `Bearer ${UserSession.getUserToken()}`}})
        .then(res => {
          if (res.data.status) {
            this.makeAlert('success' , 'Operation' , res.data.successMessage );
            this.EventDescription = '';
            this.location = '';
          }else {
            this.makeAlert('error' , 'Error Fetching my companies details' , res.data.errorMessage );
          }
        }).catch(err => {
        this.makeAlert('error' , 'Error' , err);
      });
  }
  navigateToEvent = () => {
    this.router.navigate(['events' , this.companyId ]);
  }
  updateCompanyProfile = () => {
    if (this.company.location !== null) {
      this.location = this.company.location;
      this.description = this.company.description;
      this.logo = this.company.logo;
      this.updateProfile = true;
    }
  }

}

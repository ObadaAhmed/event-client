import { Component, OnInit } from '@angular/core';
import {EventModel} from '../models/event.model';
import {ActivatedRoute } from '@angular/router';
import axios from 'axios';
import {environment} from '../../environments/environment';
import Swal from 'sweetalert2';
import {UserSession} from '../../services/UserSession';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: EventModel[] = [];
  companyId: string;
  constructor(private router: ActivatedRoute ) { }

  ngOnInit(): void {
    console.log('comapny id : ' , this.router.snapshot.params.id );
    this.companyId = this.router.snapshot.params.id;
    this.fetchCompaniesEvents();
  }

   fetchCompaniesEvents = () => {
    axios.get(environment.baseURL + `companies/fetch-company-events/${this.companyId}` , {headers: {'Authorization': `Bearer ${UserSession.getUserToken()}`}})
      .then(res => {
        if (res.data.status) {
          this.events = res.data.response;
        }else {
          this.makeAlert('error' , 'Operation' , res.data.errorMessage );
        }
      }).catch(err => {
      this.makeAlert('error' , 'Error' , err);
    });
  }

  bookEvent = (eventId) => {
    axios.post(environment.baseURL + 'events/book-event' , {user_id : UserSession.getUserData().id , event_id : eventId , status: false} , {headers: {'Authorization': `Bearer ${UserSession.getUserToken()}`}})
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

  makeAlert = (type, title, message) =>  {
    Swal.fire({
      title,
      text: message,
      icon: type,
      confirmButtonText: 'ok'
    });
  }
}

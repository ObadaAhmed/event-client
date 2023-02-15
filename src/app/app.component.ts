import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserSession} from '../services/UserSession';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'event-app';

  constructor(private router: Router) { }

  ngOnInit() {
    if (UserSession.isAuth()) {
      this.router.navigate(['/company']);
    } else {
      this.router.navigate(['/signin']);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {UserSession} from '../../services/UserSession';
import { Router , ActivatedRoute} from '@angular/router';
import {relative} from '@angular/compiler-cli/src/ngtsc/file_system';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  name: String = '';
  constructor(private router: Router , private route: ActivatedRoute , ) { }

  ngOnInit(): void {
    this.name = UserSession.getUserData().name;
  }


  logout = () => {
    UserSession.destroySession();
    this.router.navigate(['/signin']);
  }

  navigate = (route) => {
    this.router.navigate([`${route}`]);
  }

}

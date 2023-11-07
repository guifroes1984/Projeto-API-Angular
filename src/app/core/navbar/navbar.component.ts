import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { LogoutService } from 'app/seguranca/logout.service';
import { ErrorHandleService } from '../error-handle.service';
import { AuthService } from 'app/seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private logoutService: LogoutService,
    private errorHadle: ErrorHandleService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHadle.handle(erro));
  }

}

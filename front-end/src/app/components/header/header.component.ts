import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public show: Boolean = false;
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }
  toggleNavbar() {
    this.show = !this.show;
  }

  logout(): void{
    this.auth.logout();
  }

}

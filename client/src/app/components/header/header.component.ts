import { Component } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  fullname: string = "";
  sub: string = "";

  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    (() => {
      'use strict'
      const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      tooltipTriggerList.forEach(tooltipTriggerEl => {
          new bootstrap.Tooltip(tooltipTriggerEl)
      })
    })();
    this.sub = this.getFullname(this.tokenService.getUserMail()!);
  }

  logout() {
    this.tokenService.setAccessToken("");
    this.authService.isLogged = false;
    this.tokenService.setIsAdmin("false");
    this.tokenService.setUserMail("");
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([this.router.url]);
    });
  }

  getFullname(fullname: string) {
    var yeniMetin = "";
    for (var i = 0; i < fullname.length; i++) {
        var harf = fullname[i];
        if (harf === "@") {
            break;
        } else if (harf === ".") {
            yeniMetin += " ";
        } else {
            yeniMetin += harf.toUpperCase();
        }
    }
    return yeniMetin.trim();
}
}

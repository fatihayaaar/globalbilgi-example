import { Component } from '@angular/core';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private tokenService: TokenService) {}

  getIsAdmin() : boolean {
    return this.tokenService.getIsAdmin() == "true";
  }
}

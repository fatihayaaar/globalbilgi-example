import { Component } from '@angular/core';
import { PerformanceServiceService } from '../../services/performance-service/performance-service.service';
import { PerformanceData } from '../models/performance-data.model';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service/user-service.service';
import { UserData } from '../models/user-data.model';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-performance-user-list',
  templateUrl: './performance-user-list.component.html',
  styleUrl: './performance-user-list.component.css'
})
export class PerformanceUserListComponent {
  performanceData: PerformanceData[] = [];
  isDeleteConfirmationVisible = false;
  itemToDelete?: PerformanceData;

  startDate?: string;
  endDate?: string;

  constructor(private service: PerformanceServiceService, private userService: UserServiceService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.performanceData = [];
    this.getExcuseData();
  }

  getExcuseData(): void {
      this.service.getMyPerformanceData()
      .subscribe(data => {
        this.performanceData = data;
      });
  }

  editItem(item: PerformanceData): void {
    this.router.navigate(['/performance-detail-layout'], { state: { data: item } });
  }

  deleteItem(item: PerformanceData): void {
    this.itemToDelete = item;
    this.isDeleteConfirmationVisible = true;
  }

  filterClick() {
    if (this.tokenService.getIsAdmin() == "true") {
      if (this.startDate != null && this.endDate != null) {
        this.service.findPerformanceByBetweenDates(this.startDate, this.endDate).subscribe(data => {
          this.performanceData = data;
        });
      }
    } else {
      if (this.startDate != null && this.endDate != null) {
        this.service.findMyPerformanceByBetweenDates(this.startDate, this.endDate).subscribe(data => {
          this.performanceData = data;
        });
      }
    }
  }

  onConfirmation(confirmed: boolean): void {
    if (this.itemToDelete == null) {
      return;
    }
    if (confirmed) {
      this.service.deletePerformanceData(this.itemToDelete.id)
        .subscribe(() => {
          this.performanceData = this.performanceData.filter(x => x.id !== this.itemToDelete!.id);
        });
    }
    this.isDeleteConfirmationVisible = false;
  }
  
}

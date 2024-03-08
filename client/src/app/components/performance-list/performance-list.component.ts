import { Component } from '@angular/core';
import { PerformanceServiceService } from '../../services/performance-service/performance-service.service';
import { PerformanceData } from '../models/performance-data.model';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service/user-service.service';
import { UserData } from '../models/user-data.model';
import * as XLSX from 'xlsx';

export interface PerformanceDataListItem {
  fullname: string;
  agent: string;
  date: string;
  startDate: string;
  endDate: string;
  excuse: string;
  excuseHours: string;
  breakTime: string;
}

@Component({
  selector: 'app-performance-list',
  templateUrl: './performance-list.component.html',
  styleUrl: './performance-list.component.css'
})
export class PerformanceListComponent {
  performanceData: PerformanceData[] = [];
  performanceListData: PerformanceDataListItem[] = [];
  isDeleteConfirmationVisible = false;

  startDate?: string;
  endDate?: string;
  username?: string;
  userid?: number;
  showSuggestions: boolean = false;
  suggestions: UserData[] = [];

  constructor(private service: PerformanceServiceService, private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getExcuseData();
  }

  getExcuseData(): void {
    this.service.getPerformanceData()
      .subscribe(data => {
        this.performanceData = data;
        this.performanceListData = this.convert(this.performanceData);
        console.log(this.performanceListData);
      });
  }

  filterClick() {
    if (this.username == null) {
      if (this.startDate != null && this.endDate != null) {
        this.service.findPerformanceByBetweenDates(this.startDate, this.endDate).subscribe(data => {
          this.performanceData = data;
          this.performanceListData = this.convert(this.performanceData);
        });
      }
    } else {
      if (this.startDate != null && this.endDate != null) {
        console.log(this.userid);
        this.service.findPerformanceByBetweenDatesAndUser(this.startDate, this.endDate, this.userid!).subscribe(data => {
          this.performanceData = data;
          this.performanceListData = this.convert(this.performanceData);
        });
      }
    }
  }

  selectSuggestion(suggestion: UserData) {
    this.username = suggestion.firstname + " " + suggestion.surname;
    console.log(suggestion.id);
    this.userid = suggestion.id;
    this.showSuggestions = false;
  }

  hideSuggestions() {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  onTextChange() {
    if (this.username == null) {
      return;
    }
    this.showSuggestions = this.username.length > 0;
    let parts: string[] = this.username.split(" ");
    let firstName: string = parts[0];
    if (parts.length === 1) {
      var surname: string = parts[0];
    } else {
      var surname: string = parts.pop()!;
    }
    let firstName2: string = parts.slice(0, parts.length - 1).join(" ");
    if (parts.length === 1) {
      var surname2: string = parts[0];
    } else {
      var surname2: string = parts.pop()!;
      firstName2 += " " + parts.join(" ");
    }

    this.userService.searchUser(firstName, surname, firstName2, surname2).subscribe(
      (data: UserData[]) => {
        data.forEach((userData: UserData) => {
          console.log(userData.firstname);
        });
        this.suggestions = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  downloadAsExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.performanceListData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'table_data');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(data);
    a.download = `${fileName}.xlsx`;
    a.click();
    document.body.removeChild(a);
  }

  convert(data: PerformanceData[]): PerformanceDataListItem[] {
    return data.map(item => ({
      fullname: `${this.capitalizeFirstLetter(item.user.firstname)} ${this.capitalizeFirstLetter(item.user.surname)}`,
      agent: item.user.agent,
      date: item.dateInfo,
      startDate: item.beginTime,
      endDate: item.endTime,
      excuse: item.excuse,
      excuseHours: item.excuseHours.toString(),
      breakTime: item.breakTime.toString()
    }));
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

}

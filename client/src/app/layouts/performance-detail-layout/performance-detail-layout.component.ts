import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PerformanceServiceService } from '../../services/performance-service/performance-service.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-performance-detail-layout',
  templateUrl: './performance-detail-layout.component.html',
  styleUrl: './performance-detail-layout.component.css'
})
export class PerformanceDetailLayoutComponent {
  id: number = 0;
  dateInfo: string = '';
  beginTime: string = '';
  endTime: string = ''
  excuseHours: number = 0;
  excuse: string = '';
  breakTime: number = 0;
  showErrorMessage: boolean = false;
  data: any;
  public isEditMode: boolean = false;

  constructor(private service: PerformanceServiceService, private route: ActivatedRoute, private tokenService: TokenService) { }

  ngOnInit() {
    if (typeof window == 'undefined') {
      return;
    }
    const navigation = window.history.state;
    if (navigation && navigation.data) {
      this.data = navigation.data;
      console.log(this.data);
      this.id = this.data.id;
      this.dateInfo = this.data.dateInfo;
      this.beginTime = this.data.beginTime;
      this.endTime = this.data.endTime;
      this.excuse = this.convertToSnakeCase(this.data.excuse);
      this.excuseHours = this.data.excuseHours;
      this.breakTime = this.data.breakTime;
      this.isEditMode = true;
    }
  }

  onSubmit() {
    console.log("Form submitted!");
    console.log("begin time: ", this.beginTime);
    console.log("date: ", this.parseDate(this.dateInfo));
    console.log("end time: ", this.endTime);
    console.log("excuse hours: ", this.excuseHours);
    console.log("excuse: ", this.excuse);
    console.log(this.convertToTimestamp(this.beginTime));

    this.service.performanceDto = {
      "beginTime": this.convertToTimestamp(this.beginTime),
      "endTime": this.convertToTimestamp(this.endTime),
      "dateInfo": this.parseDate(this.dateInfo),
      "excuse": this.excuse,
      "excuseHours": this.excuseHours,
      "breakTime" : this.breakTime,
    }
    if (this.isEditMode) {
      this.service.performanceDto.id = this.id;
      this.service.updatePerformance();
    } else {
      this.service.addPerformance();
    }
  }

  convertToTimestamp(time: string) {
    const today = new Date();
    const timeParts = time.split(':');
    today.setHours(Number(timeParts[0]));
    today.setMinutes(Number(timeParts[1]));
    today.setSeconds(0);

    const timestampValue = today.getTime();

    const timestamp = new Date(timestampValue);
    return timestamp;
  }

  convertToTime(timestampValue: any) {
    const date = new Date(timestampValue);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private parseDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  validateForm() {
    // Check if any input field is empty
    if (!this.dateInfo || !this.beginTime || !this.endTime || !this.breakTime || !this.excuse || !this.excuseHours) {
      this.showErrorMessage = true;
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 5000); // 5 seconds
    } else {
      this.onSubmit();
    }
  }

  convertToSnakeCase(input: string): string {
    return input.replace(/\s+/g, '_').toUpperCase();
  }
  
}

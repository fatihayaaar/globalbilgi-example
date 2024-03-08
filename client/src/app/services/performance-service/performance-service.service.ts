import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { PerformanceData } from '../../components/models/performance-data.model';

@Injectable({
  providedIn: 'root'
})
export class PerformanceServiceService {
  performanceDto: any = {};

  constructor(private http: HttpClient, private router: Router) { }

  addPerformance() {
    console.log(this.addPerformance);
    this.http.post<boolean>('http://localhost:8080/api/performance/add', this.performanceDto).subscribe(
      response => {
        this.router.navigate(['/home-page']);
        console.log('Success: ', response);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  updatePerformance() {
    this.http.put<boolean>('http://localhost:8080/api/performance/update', this.performanceDto).subscribe(
      response => {
        this.router.navigate(['/home-page']);
        console.log('Success: ', response);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  getPerformanceData(): Observable<PerformanceData[]> {
    return this.http.get<PerformanceData[]>('http://localhost:8080/api/performance/all').pipe(
      map(performanceDataArray => {
        return performanceDataArray.map(performanceData => {
          performanceData.endTime = this.convertToTime(performanceData.endTime);
          performanceData.beginTime = this.convertToTime(performanceData.beginTime);
          performanceData.excuse = this.convertToCamelCase(performanceData.excuse);
          return performanceData;
        });
      }));
  }

  getMyPerformanceData(): Observable<PerformanceData[]> {
    return this.http.get<PerformanceData[]>('http://localhost:8080/api/performance/get/my').pipe(
      map(performanceDataArray => {
        return performanceDataArray.map(performanceData => {
          performanceData.endTime = this.convertToTime(performanceData.endTime);
          performanceData.beginTime = this.convertToTime(performanceData.beginTime);
          performanceData.excuse = this.convertToCamelCase(performanceData.excuse);
          return performanceData;
        });
      }));
  }

  deletePerformanceData(id: number) {
    return this.http.delete<boolean>("http://localhost:8080/api/performance/delete/" + id);
  }

  findPerformanceByBetweenDates(startDate: string, endDate: string): Observable<PerformanceData[]> {
    return this.http.post<PerformanceData[]>("http://localhost:8080/api/performance/get/filter", {
      "startDate": startDate,
      "endDate": endDate,
    }).pipe(
      map(performanceDataArray => {
        return performanceDataArray.map(performanceData => {
          performanceData.endTime = this.convertToTime(performanceData.endTime);
          performanceData.beginTime = this.convertToTime(performanceData.beginTime);
          performanceData.excuse = this.convertToCamelCase(performanceData.excuse);
          return performanceData;
        });
      }));;
  }

  findPerformanceByBetweenDatesAndUser(startDate: string, endDate: string, userid: number): Observable<PerformanceData[]> {
    return this.http.post<PerformanceData[]>("http://localhost:8080/api/performance/get/filter", {
      "startDate": startDate,
      "endDate": endDate,
      "user" : {
          "id": userid,
      }
    }).pipe(
      map(performanceDataArray => {
        return performanceDataArray.map(performanceData => {
          performanceData.endTime = this.convertToTime(performanceData.endTime);
          performanceData.beginTime = this.convertToTime(performanceData.beginTime);
          performanceData.excuse = this.convertToCamelCase(performanceData.excuse);
          return performanceData;
        });
      }));;
  }

  findMyPerformanceByBetweenDates(startDate: string, endDate: string): Observable<PerformanceData[]> {
    return this.http.post<PerformanceData[]>("http://localhost:8080/api/performance/get/my-filter", {
      "startDate": startDate,
      "endDate": endDate,
    }).pipe(
      map(performanceDataArray => {
        return performanceDataArray.map(performanceData => {
          performanceData.endTime = this.convertToTime(performanceData.endTime);
          performanceData.beginTime = this.convertToTime(performanceData.beginTime);
          performanceData.excuse = this.convertToCamelCase(performanceData.excuse);
          return performanceData;
        });
      }));;
  }

  convertToTime(timestampValue: any) {
    const date = new Date(timestampValue);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  }

  convertToCamelCase(input: string): string {
    return input.split('_').join(' ');
  }

}

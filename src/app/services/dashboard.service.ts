import { DashboardModel } from './../models/dashboard.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  getDashboardList(): Observable<any> {
    return this.http.get<any>(baseUrl + '/list');
  }

  getRecentlyUsedList(): Observable<any> {
    return this.http.get<any>(baseUrl + '/list/recently-used');
  }

  getRecentlyUsedAndOnlineList(): Observable<any> {
    return this.http.get<any>(baseUrl + '/list/recently-used-online');
  }

  getOnlineDashboardList(): Observable<any> {
    return this.http.get<any>(baseUrl + '/list/online');
  }

  getOfflineDashboardList(): Observable<any> {
    return this.http.get<any>(baseUrl + '/list/offline');
  }

  getDashboardById(id: string): Observable<any> {
    return this.http.get(`${baseUrl}/list/${id}`);
  }

  addDashboard(data: any): Observable<any> {
    return this.http.post(baseUrl + '/add', data, { responseType: 'text' });
  }

  updateDashboard(id: String, dashboard: DashboardModel): Observable<Object> {
    return this.http.put(`${baseUrl}/update/${id}`, dashboard);
  }

  viewDashboard(id: String, dashboard: DashboardModel): Observable<Object> {
    return this.http.put(`${baseUrl}/view/${id}`, dashboard);
  }

  updateDashboardStatus(id: String, data: any): Observable<Object> {
    return this.http.put(`${baseUrl}/status-update/${id}`, data);
  }

  deleteDashboardById(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }

}

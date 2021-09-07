import { WidgetModel } from './../models/widget.module';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/widget-controller';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  constructor(private http: HttpClient) {}

  getAllWidgets(): Observable<any> {
    return this.http.get<any>(baseUrl + '/list');
  }

  getWidgetById(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/list/${id}`);
  }

  getDashboardWidgetById(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/list/widget/${id}`);
  }

  addWidget(data: any): Observable<any> {
    return this.http.post(baseUrl + '/add', data, { responseType: 'text' });
  }

  updateWidget(id: String, widget: WidgetModel): Observable<Object> {
    return this.http.put(`${baseUrl}/update/${id}`, widget);
  }

  updateWidgetCoordinates( widgetList: WidgetModel[]): Observable<Object> {
    return this.http.put(`${baseUrl}/update-coordinates`, widgetList);
  }

  deleteWidgetById(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }
}

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { WidgetService } from './services/widget.service';

describe('maintained Angular HTTP compatibility', () => {
  it('loads dashboard widgets through POST because opening a dashboard records its recent-use date', () => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    const service = TestBed.inject(WidgetService);
    const http = TestBed.inject(HttpTestingController);
    let result: unknown;
    service.getDashboardWidgetById('dashboard-1').subscribe(value => { result = value; });
    const request = http.expectOne('http://localhost:8080/api/widget-controller/list/widget/dashboard-1');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({});
    request.flush([{ id: 'widget-1' }]);
    expect(result).toEqual([{ id: 'widget-1' }]);
    http.verify();
  });
  it('keeps the existing mutation endpoint, method and JSON payload', () => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    const service = TestBed.inject(WidgetService);
    const http = TestBed.inject(HttpTestingController);
    const payload: any = [{ id: 'widget-1', x: 1, y: 2, cols: 2, rows: 1 }];
    let result: unknown;
    service.updateWidgetCoordinates(payload).subscribe(value => { result = value; });
    const request = http.expectOne('http://localhost:8080/api/widget-controller/update-coordinates');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(payload);
    request.flush({ saved: true });
    expect(result).toEqual({ saved: true });
    http.verify();
  });
});

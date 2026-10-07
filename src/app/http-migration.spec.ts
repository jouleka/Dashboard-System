import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { WidgetService } from './services/widget.service';

describe('maintained Angular HTTP compatibility', () => {
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

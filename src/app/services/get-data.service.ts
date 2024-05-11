import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CpuUsage } from '../types/CpuResponse.types';
import { ErrorRateResponse } from '../types/ErrorRateResponse.types';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCpuUsage(): Observable<CpuUsage> {
    return this.http.get<CpuUsage>(`${this.apiUrl}/cpuUsage`);
  }

  getErrorRate(): Observable<ErrorRateResponse> {
    return this.http.get<ErrorRateResponse>(`${this.apiUrl}/errorRate`);
  }
}

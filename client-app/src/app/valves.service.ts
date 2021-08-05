import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ValvesService {
  constructor(private http: HttpClient) {}

  getStatus() {
    return this.http.get(`${environment.apiUrl}/status`);
  }

  openValve(valve: number) {
    return this.http.get(`${environment.apiUrl}/valve/open/${valve}`);
  }

  closeValve(valve: number) {
    return this.http.get(`${environment.apiUrl}/valve/close/${valve}`);
  }
}

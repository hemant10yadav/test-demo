import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // GET method
  public get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${endpoint}`);
  }

  // POST method
  public post<T>(endpoint: string, data: object): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, data);
  }

  // PUT method
  public put<T>(endpoint: string, data: object): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, data);
  }

  // DELETE method
  public delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`);
  }

  public getLocations<T>(location: string): Observable<T> {
    return this.http.get<T>(
      `http://api.geonames.org/searchJSON?name_startsWith=${location}&maxRows=5&username=dimagi`
    );
  }
}

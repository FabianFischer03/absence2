import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor(private http: HttpClient) { }

  public create() {
    this.http.post("https://localhost:3001/absence", {});
  }

  public getAll() {
    return this.http.get(environment.api_url+ "absence");
  }

  public delete(id) {
    return this.http.delete(`${environment.api_url}absence/${id}` );
  }

  public update(id, data) {
    return this.http.put(`${environment.api_url}absence/${id}`, data );
  }
}
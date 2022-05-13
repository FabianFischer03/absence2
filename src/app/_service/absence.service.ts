import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import Amplify, { Storage } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor(private http: HttpClient) {
    Amplify.configure(environment.amplifyConfig);
  }

  public async create(uid, file) {
    return new Promise((res, rej) => {
      let fileName = Date.now() + "-" + file.name;
      console.log(fileName);
      Storage.put(fileName, file)
        .then(data => {
          console.log(data);
          this.http.post(`${environment.api_url}absence`, { uid: uid, key: `public/${data.key}` }).pipe(take(1)).subscribe(result => {
            console.log(result);
            res(result);
          })
        }).catch((err)=> {
          console.error(1);
          rej(err);
        })
    })
  }

  public getOne(id) {
    return this.http.get(`${environment.api_url}absence/${id}` );
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
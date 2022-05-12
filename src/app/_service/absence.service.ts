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
      Storage.put(file.name, file)
        .then(data => {
          console.log(data);
          this.http.post(`${environment.api_url}absence`, { uid: uid, key: `public/${data.key}` }).pipe(take(1)).subscribe(result => {
            console.log(result);
            res(result);
          })
            /*.toPromise()
            .then((data) => {
              res(data);
            }).catch((err) => {
              console.error(2);
              rej(err);
            })*/
        }).catch((err)=> {
          console.error(1);
          rej(err);
        })
    })
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
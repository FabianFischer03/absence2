import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Amplify, {Storage} from 'aws-amplify';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignatureService {

  constructor(private http: HttpClient) {
    Amplify.configure(environment.amplifyConfig);
  }

  public async uploadSignature(uid, file) {
    return new Promise((res, rej) => {
      let fileName = "signature/" + Date.now() + "-" + file.name;
      console.log(fileName);
      Storage.put(fileName, file)
        .then(data => {
          console.log(data);
          this.http.post(`${environment.api_url}signature`, { uid: uid, key: `public/${data.key}` }).pipe(take(1)).subscribe(result => {
            console.log(result);
            res(result);
          })
        }).catch((err)=> {
          console.error(1);
          rej(err);
        })
    })
  }

  public get(uid) {
    return this.http.get(`${environment.api_url}signature/${uid}`);
  }
}

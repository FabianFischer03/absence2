import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Amplify, { Auth, Storage } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { User } from '../_interfaces/user';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  private authenticationSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    Amplify.configure(environment.amplifyConfig);
    this.authenticationSubject = new BehaviorSubject<boolean>(false);
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

  public signUp(user: User): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password
    })
  }

  public confirmSignup(user: User): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: User): Promise<any> {
    return Auth.signIn(user.email, user.password)
      .then(() => {
        this.authenticationSubject.next(true);
      });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => {
        this.authenticationSubject.next(false);
      })
  }

  public isAuthenticated(): Promise<any> {
    return new Promise((res, rej) => {
      this.getUser()
        .then((user) => {
          if (user) {
            res(true);
          } else {
            res(false);
          }
        }).catch((err) => {
          console.error(err);
          rej(false)
        })
    })

  }

  public getUser() {
    return Auth.currentUserInfo();
  }

  public updateUser(user: User): Promise<any> {
    return Auth.currentUserPoolUser()
      .then((cognitoUser: any) => {
        return Auth.updateUserAttributes(cognitoUser, user);
      })
  }

  public getJWTToken(): Promise<any> {
    return new Promise((res, rej) => {
      Auth.currentSession()
        .then((session) => {
          console.log(session);
          console.log(session.getAccessToken().getIssuedAt(), session.getAccessToken().getExpiration());
          res(session.getAccessToken().getJwtToken());
        }).catch(() => {
          rej()
        })
    })
  }

}

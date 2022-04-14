import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Amplify, { Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { User } from '../_interfaces/user';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  private authenticationSubject: BehaviorSubject<any>;

  constructor() {
    Amplify.configure({
      Auth: environment.cognito
    });
    this.authenticationSubject = new BehaviorSubject<boolean>(false);
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
    if ( this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
        .then((user) => {
          if (user) {
            return true;
          } else {
            return false;
          }
        }).catch(() => {
          return false;
        })
    }
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

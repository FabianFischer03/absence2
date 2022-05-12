import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CognitoService } from '../_service/cognito.service';

@Injectable({
  providedIn: 'root'
})
export class CognitoGuard implements CanActivate {

  private loggedIn: boolean;

  constructor(private cognitoService: CognitoService) {

  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.cognitoService.isAuthenticated()
      .then((res) => {
        this.loggedIn = res;
      }).catch(() => {
        this.loggedIn = false;
      })

    return this.loggedIn;
  }
  
}

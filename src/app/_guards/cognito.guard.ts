import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CognitoService } from '../_service/cognito.service';

@Injectable({
  providedIn: 'root'
})
export class CognitoGuard implements CanActivate {


  constructor(private cognitoService: CognitoService, private router: Router) {

  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.cognitoService.isAuthenticated()
      .then((res) => {
        if (!res) {
          this.router.navigate(['auth']);
          resolve(false);
        } else {
          resolve(true);
        }
        console.log(3, res);
      }).catch((err) => {
        this.router.navigate(['auth']);
        resolve(false);
      })
    })
  
  }
  
}

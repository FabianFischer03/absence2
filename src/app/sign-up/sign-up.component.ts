import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_interfaces/user';
import { CognitoService } from '../_service/cognito.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public loading: boolean;
  public isConfirm: boolean;
  public user: User;

  constructor(private cognitoService: CognitoService, private router: Router) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as User;
  }

  public signUp(): void {
    this.loading = true; 
    this.cognitoService.signUp(this.user)
      .then(() => {
        this.loading = false;
        this.isConfirm = true;
      }).catch(() => {
        this.loading = false;
      })
  } 

  public confirmSignUp() {
    this.loading = true;
    this.cognitoService.confirmSignup(this.user)
      .then(() => {
        this.router.navigate(["sign-in"]);
      }).catch(() => {
        this.loading = false;
      })
  }

  ngOnInit(): void {
  }

}

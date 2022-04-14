import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_interfaces/user';
import { CognitoService } from '../_service/cognito.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public loading: boolean; 
  public user: User;

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as User;
  }

  public signIn(): void {
    this.loading = true;
    this.cognitoService.signIn(this.user)
      .then(() => {
        this.router.navigate(["profile"]);
      }).catch(() => {
        this.loading = false;
      })
  }

  ngOnInit(): void {
  }

}

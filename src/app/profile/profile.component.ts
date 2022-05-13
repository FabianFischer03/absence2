import { Component, OnInit } from '@angular/core';
import { User } from '../_interfaces/user';
import { CognitoService } from '../_service/cognito.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public loading: boolean;
  public user: User;

  constructor(private cognitoService: CognitoService) {
    this.loading = false; 
    this.user = {} as User;
    this.cognitoService.getJWTToken().then(data => { console.log(data)})
  }

  ngOnInit(): void {
    this.cognitoService.getUser()
      .then((user: any) => {
        this.user = user.attributes;
      });
  }

  public update(): void {
    this.loading = true;
    this.cognitoService.updateUser(this.user)
      .then(() => {
        this.loading = false;
        alert("Updated User Info");
      }).catch(() => {
        this.loading = false;
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { User } from '../_interfaces/user';
import { CognitoService } from '../_service/cognito.service';
import { SignatureService } from '../_service/signature.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public loading: boolean;
  public user: User;
  private uid: string;
  private toFile;
  public signature;

  constructor(private cognitoService: CognitoService, private signatureService: SignatureService) {
    this.loading = false; 
    this.user = {} as User;
    this.cognitoService.getJWTToken().then(data => { console.log(data)});
    this.cognitoService.getUser().then(user => {
      this.uid = user.username;
      this.signatureService.get(this.uid).subscribe((signature) => {
        this.signature = signature;
      })
    })  
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

  public onChange(event) {
    this.toFile = event.target.files;
  }

  public uploadSignature() {
    this.cognitoService.uploadSignature(this.uid, this.toFile.item(0))
      .then((success:any) => {
        alert(success.message);
      }).catch(err => {
        console.error(err);
      })
  }


}

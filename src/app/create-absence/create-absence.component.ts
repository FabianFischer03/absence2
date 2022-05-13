import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbsenceService } from '../_service/absence.service';
import { CognitoService } from '../_service/cognito.service';

@Component({
  selector: 'app-create-absence',
  templateUrl: './create-absence.component.html',
  styleUrls: ['./create-absence.component.css']
})
export class CreateAbsenceComponent implements OnInit {

  private uid;
  private toFile;

  constructor(private absenceService: AbsenceService, private cognitoService: CognitoService, private router: Router) {
    this.cognitoService.getUser().then(user => {
      this.uid = user.username;
    })
  }

  public onChange(event) {
    this.toFile = event.target.files;
  }

  public create() {
    this.absenceService.create(this.uid, this.toFile.item(0))
      .then((success:any) => {
        alert(success.message);
        this.router.navigate(["/absence-page"]);
      }).catch(err => {
        console.error(err);
      })
  }

  ngOnInit(): void {
  }

}

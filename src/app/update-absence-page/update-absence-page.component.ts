import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbsenceService } from '../_service/absence.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-absence-page',
  templateUrl: './update-absence-page.component.html',
  styleUrls: ['./update-absence-page.component.css']
})
export class UpdateAbsencePageComponent implements OnInit {
  public reasonForm:FormGroup;
  
  public absences: any = [];
  public absence = {
    id: null,
    reason: null,
    date: null,
    status: null,
  }

  constructor(private absenceService: AbsenceService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.absence.id = this.route.snapshot.paramMap.get("id");
    console.log(this.absence.id);
    this.reasonForm = this.formBuilder.group({
      reason: [null, [Validators.required]],
      date:[null, [Validators.required]],
      status:[null, [Validators.required]]
    });

    this.absenceService.getAll().subscribe(absences => {
      this.absences = absences;
      console.log(absences)
    })
  }

  ngOnInit(): void {
  }
  
  public update(data) {
    data = {
        date: this.reasonForm.controls.date.value,
        reason: this.reasonForm.controls.reason.value,
        status: this.reasonForm.controls.status.value
    }
    this.absenceService.update(this.absence.id, data).subscribe((res: any) => {
      alert(res.message);
    })
  }

}

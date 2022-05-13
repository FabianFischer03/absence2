import { Component, OnInit } from '@angular/core';
import { AbsenceService } from '../_service/absence.service';

@Component({
  selector: 'app-absence-page',
  templateUrl: './absence-page.component.html',
  styleUrls: ['./absence-page.component.css']
})
export class AbsencePageComponent implements OnInit {

  public absences: any = [];

  constructor(private absenceService: AbsenceService) {
    this.absenceService.getAll().subscribe(absences => {
      this.absences = absences;
      console.log(absences);
    })
  }

  ngOnInit(): void {
  }

  public formatDate(dateString: string) {
    let date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
  }

  public delete(id: string) {
    this.absenceService.delete(id).subscribe((res:any) => {
      alert(res.message);
      console.log(res);
    })
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbsencePageComponent } from './absence-page/absence-page.component';
import { AuthComponent } from './auth/auth.component';
import { CreateAbsenceComponent } from './create-absence/create-absence.component';
import { GroupPageComponent } from './group-page/group-page.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateAbsencePageComponent } from './update-absence-page/update-absence-page.component';
import { CognitoGuard } from './_guards/cognito.guard';

const routes: Routes = [
  { path: "", redirectTo: "auth", pathMatch: "full" },
  { path: "profile", component: ProfileComponent, canActivate: [CognitoGuard]},
  { path: "absence-page", component: AbsencePageComponent, canActivate: [CognitoGuard] },
  { path: "group-page", component: GroupPageComponent, canActivate: [CognitoGuard] },
  { path: "update-absence-page/:id", component: UpdateAbsencePageComponent, canActivate: [CognitoGuard] },
  { path: "auth", component: AuthComponent },
  { path: "create", component: CreateAbsenceComponent, canActivate: [CognitoGuard] },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

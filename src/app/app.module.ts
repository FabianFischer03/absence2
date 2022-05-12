import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { AbsencePageComponent } from './absence-page/absence-page.component';
import { GroupPageComponent } from './group-page/group-page.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateAbsencePageComponent } from './update-absence-page/update-absence-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { AuthComponent } from './auth/auth.component';
import { CreateAbsenceComponent } from './create-absence/create-absence.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AbsencePageComponent,
    GroupPageComponent,
    UpdateAbsencePageComponent,
    AuthComponent,
    CreateAbsenceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AmplifyAuthenticatorModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

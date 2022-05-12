import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { AbsencePageComponent } from './absence-page/absence-page.component';
import { GroupPageComponent } from './group-page/group-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    ProfileComponent,
    AbsencePageComponent,
    GroupPageComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AmplifyAuthenticatorModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

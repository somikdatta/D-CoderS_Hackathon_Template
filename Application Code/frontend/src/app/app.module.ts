import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SignupComponent } from "./auth/signup/signup.component";

import { StudentSignupComponent } from "./auth/signup/student-signup/student-signup.component";
import { TeacherSignupComponent } from "./auth/signup/teacher-signup/teacher-signup.component";
import { HodSignupComponent } from "./auth/signup/hod-signup/hod-signup.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    StudentSignupComponent,
    TeacherSignupComponent,
    HodSignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

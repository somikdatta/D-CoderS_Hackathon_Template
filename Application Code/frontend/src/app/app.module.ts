import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SignupComponent } from "./auth/signup/signup.component";
import { ErrorComponent } from "./error/error.component";

import { StudentSignupComponent } from "./auth/signup/student-signup/student-signup.component";
import { TeacherSignupComponent } from "./auth/signup/teacher-signup/teacher-signup.component";
import { HodSignupComponent } from "./auth/signup/hod-signup/hod-signup.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDialogModule } from "@angular/material/dialog";
import { ErrorInterceptor } from "./error-interceptor";
import { LoginComponent } from "./auth/login/login.component";
import { HodComponent } from "./hod/hod.component";
import { StudentComponent } from "./student/student.component";
import { TeacherComponent } from "./teacher/teacher.component";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NewLorComponent } from "./student/new-lor/new-lor.component";
import { PreviousLorComponent } from "./student/previous-lor/previous-lor.component";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    StudentSignupComponent,
    TeacherSignupComponent,
    HodSignupComponent,
    ErrorComponent,
    LoginComponent,
    HodComponent,
    StudentComponent,
    TeacherComponent,
    DashboardComponent,
    NewLorComponent,
    PreviousLorComponent
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
    MatToolbarModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {}

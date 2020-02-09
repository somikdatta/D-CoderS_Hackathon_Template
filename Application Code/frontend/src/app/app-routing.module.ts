import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { ReverseGuard } from "./auth/reverse.guard";
import { HodGuard } from "./auth/hod.guard";
import { HodComponent } from "./hod/hod.component";
import { TeacherComponent } from "./teacher/teacher.component";
import { StudentComponent } from "./student/student.component";
import { TeacherGuard } from "./auth/teacher.guard";
import { StudentGuard } from "./auth/student.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "signup", pathMatch: "full" },
  { path: "signup", component: SignupComponent, canActivate: [ReverseGuard] },
  { path: "login", component: LoginComponent, canActivate: [ReverseGuard] },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "hod",
    component: HodComponent,
    canActivate: [HodGuard]
  },
  {
    path: "teacher",
    component: TeacherComponent,
    canActivate: [TeacherGuard]
  },
  {
    path: "student",
    component: StudentComponent,
    canActivate: [StudentGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

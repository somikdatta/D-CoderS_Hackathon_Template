import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { ReverseGuard } from "./auth/reverse.guard";

const routes: Routes = [
  { path: "signup", component: SignupComponent, canActivate: [ReverseGuard] },
  { path: "login", component: LoginComponent, canActivate: [ReverseGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

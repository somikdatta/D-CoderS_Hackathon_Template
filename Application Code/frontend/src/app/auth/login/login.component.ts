import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Login } from "src/app/models/login";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  LOGIN_URL = environment.apiEndPoint + "user/login";
  isLoading = false;
  loginPayload: Login;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.loginUser(form.value.uniqueid, form.value.password);
  }
}

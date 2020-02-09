import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { TeacherSignup } from "src/app/models/signup";
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-hod-signup",
  templateUrl: "./hod-signup.component.html",
  styleUrls: ["./hod-signup.component.css"]
})
export class HodSignupComponent implements OnInit {
  SIGNUP_URL = environment.apiEndPoint + "user/signup";
  isLoading = false;
  singupPayload: TeacherSignup;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.singupPayload = {
      firstname: form.value.fname,
      lastname: form.value.lname,
      uniqueid: form.value.uniqueid,
      password: form.value.password,
      department: form.value.department,
      profession: 0
    };
    this.http.post(this.SIGNUP_URL, this.singupPayload).subscribe(
      res => {
        console.log(res);
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }
}

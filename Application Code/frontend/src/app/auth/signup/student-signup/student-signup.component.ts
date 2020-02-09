import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { StudentSignup } from "src/app/models/signup";

@Component({
  selector: "app-student-signup",
  templateUrl: "./student-signup.component.html",
  styleUrls: ["./student-signup.component.css"]
})
export class StudentSignupComponent implements OnInit {
  SIGNUP_URL = environment.apiEndPoint + "user/signup";
  isLoading = false;
  singupPayload: StudentSignup;

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
      course: form.value.course,
      department: form.value.department,
      semester: form.value.semester,
      profession: 2
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

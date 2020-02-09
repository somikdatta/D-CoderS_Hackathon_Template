import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { StudentSignup } from "src/app/models/signup";
import { AuthService } from "../../auth.service";

@Component({
  selector: "app-student-signup",
  templateUrl: "./student-signup.component.html",
  styleUrls: ["./student-signup.component.css"]
})
export class StudentSignupComponent implements OnInit {
  isLoading = false;
  singupPayload: StudentSignup;

  constructor(private authService: AuthService) {}

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
    this.authService.createStudent(this.singupPayload);
  }
}

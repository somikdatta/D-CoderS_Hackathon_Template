import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const authorization = this.authService.getAuthorization();
    if (authorization == 0) {
      this.router.navigate(["/hod"]);
    }
    if (authorization == 1) {
      this.router.navigate(["/teacher"]);
    }
    if (authorization == 2) {
      this.router.navigate(["/student"]);
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    this.authService.autoAuthUser();
  }
  onLogout() {
    this.authService.logoutUser();
  }
}

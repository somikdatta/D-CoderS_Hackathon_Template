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
    this.authService.autoAuthUser();
    this.isAuthenticated = this.authService.getIsAuth();
    this.authService
      .getAuthStatusListener()
      .subscribe(status => (this.isAuthenticated = status));
  }
  onLogout() {
    this.authService.logoutUser();
  }
}

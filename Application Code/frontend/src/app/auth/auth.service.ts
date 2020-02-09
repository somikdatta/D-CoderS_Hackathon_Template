import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Login } from "../models/login";
import { StudentSignup, TeacherSignup } from "../models/signup";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  SIGNUP_URL = environment.apiEndPoint + "user/signup";
  LOGIN_URL = environment.apiEndPoint + "user/login";
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authorization: number;
  private firstname: string;
  private lastname: string;
  private authStatusListener = new Subject<boolean>();
  // private firstNameListener = new Subject<string>();
  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // getFirstNameListener() {
  //   return this.firstNameListener.asObservable();
  // }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  isHod() {
    if (this.authorization == 0) {
      return true;
    }
    return false;
  }
  isTeacher() {
    if (this.authorization == 1) {
      return true;
    }
    return false;
  }

  isStudent() {
    if (this.authorization == 2) {
      return true;
    }
    return false;
  }

  getAuthorization() {
    return this.authorization;
  }

  getName() {
    return this.firstname + " " + this.lastname;
  }
  getFirstName() {
    return this.firstname;
  }

  createStudent(payload: StudentSignup) {
    this.http.post(this.SIGNUP_URL, payload).subscribe(
      () => {
        this.loginUser(payload.uniqueid, payload.password);
      },
      err => {
        this.authStatusListener.next(false);
      }
    );
  }

  createTeacher(payload: TeacherSignup) {
    this.http.post(this.SIGNUP_URL, payload).subscribe(
      () => {
        this.loginUser(payload.uniqueid, payload.password);
      },
      err => {
        this.authStatusListener.next(false);
      }
    );
  }

  loginUser(uniqueid: number, password: string) {
    const authData: Login = {
      uniqueid: uniqueid,
      password: password
    };
    this.http
      .post<{
        token: string;
        expiresIn: number;
        userId: string;
        authorization: string;
        firstname: string;
        lastname: string;
      }>(this.LOGIN_URL, authData)
      .subscribe(
        res => {
          this.token = res.token;
          if (this.token) {
            const expiresIn = res.expiresIn;
            this.setAuthTimer(expiresIn);
            this.isAuthenticated = true;
            this.userId = res.userId;
            this.firstname = res.firstname;
            this.lastname = res.lastname;
            this.authorization = parseInt(res.authorization);
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresIn * 1000);
            this.saveAuthData(
              this.token,
              expirationDate,
              this.userId,
              this.authorization,
              this.firstname,
              this.lastname
            );
            this.router.navigate(["/dashboard"]);
          }
        },
        err => {
          this.authStatusListener.next(false);
        }
      );
  }

  saveNameToStorage(firstname: string, lastname: string) {
    localStorage.setItem("firstname", firstname);
    localStorage.setItem("lastname", lastname);
    // this.firstNameListener.next(firstname);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.firstname = authInformation.firstname;
      this.lastname = authInformation.lastname;
      this.authorization = parseInt(authInformation.authorization);
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    this.firstname = null;
    this.lastname = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logoutUser();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    authorization: number,
    firstname: string,
    lastname: string
  ) {
    localStorage.setItem("token", token);
    localStorage.setItem("expirationDate", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("authorization", authorization.toString());
    localStorage.setItem("firstname", firstname);
    localStorage.setItem("lastname", lastname);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("authorization");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expirationDate");
    const userId = localStorage.getItem("userId");
    const authorization = localStorage.getItem("authorization");
    const firstname = localStorage.getItem("firstname");
    const lastname = localStorage.getItem("lastname");

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      authorization: authorization,
      firstname: firstname,
      lastname: lastname
    };
  }
}

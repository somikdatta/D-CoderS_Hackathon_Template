import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class LorService {
  private NEW_LOR_URL = environment.apiEndPoint + "recommendation/newlor";
  private GET_OWN_LOR_URL = environment.apiEndPoint + "recommendation/mylors";
  private DELETE_LOR_URL = environment.apiEndPoint + "recommendation/deletelor";
  private TOBEREVIEWED_LOR_URL =
    environment.apiEndPoint + "recommendation/tobereviewed";
  private TEACHERS_URL = environment.apiEndPoint + "user/teachers";
  private ASSIGN_TEACHER_URL =
    environment.apiEndPoint + "recommendation/assignteacher";
  private TO_REVIEW_LOR_URL =
    environment.apiEndPoint + "recommendation/toreview";
  private SUBMIT_REVIEW_URL =
    environment.apiEndPoint + "recommendation/submitreview";

  constructor(private http: HttpClient) {}

  newLor(title: string, files: any) {
    const postData = new FormData();
    postData.append("title", title);
    for (let i = 0; i < files.length; i++) {
      postData.append("files", files[i], title);
    }
    this.http.post(this.NEW_LOR_URL, postData).subscribe(res => {
      console.log("ok");
    });
  }

  getMyLor() {
    return this.http.get(this.GET_OWN_LOR_URL);
  }

  deleteLor(id: string) {
    const URL = this.DELETE_LOR_URL + `/${id}`;
    return this.http.delete(URL);
  }

  getToBeReviewed() {
    return this.http.get(this.TOBEREVIEWED_LOR_URL);
  }

  getTeachers() {
    return this.http.get(this.TEACHERS_URL);
  }

  assignTeacher(id: string, teacher: string) {
    const URL = this.ASSIGN_TEACHER_URL + `/${id}`;
    return this.http.patch(URL, { teacher: teacher });
  }

  toReview() {
    return this.http.get(this.TO_REVIEW_LOR_URL);
  }

  submitReview(id: string, review: string) {
    const URL = this.SUBMIT_REVIEW_URL + `/${id}`;
    return this.http.patch(URL, { review: review });
  }
}

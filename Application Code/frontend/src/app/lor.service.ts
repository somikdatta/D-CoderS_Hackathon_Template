import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class LorService {
  NEW_LOR_URL = environment.apiEndPoint + "recommendation/newlor";
  GET_OWN_LOR_URL = environment.apiEndPoint + "recommendation/mylors";
  DELETE_LOR_URL = environment.apiEndPoint + "recommendation/deletelor";
  TOBEREVIEWED_LOR_URL =
    environment.apiEndPoint + "recommendation/tobereviewed";

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
}

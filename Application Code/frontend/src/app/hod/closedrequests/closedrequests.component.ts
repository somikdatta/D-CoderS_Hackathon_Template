import { Component, OnInit } from "@angular/core";
import { MyLor } from "src/app/models/lor";
import { LorService } from "src/app/lor.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-closedrequests",
  templateUrl: "./closedrequests.component.html",
  styleUrls: ["./closedrequests.component.css"]
})
export class ClosedrequestsComponent implements OnInit {
  acceptedLors: MyLor[];
  rejectedLors: MyLor[];
  course = ["Bachelors", "Masters"];
  isLoading = true;
  constructor(private lorService: LorService) {}

  ngOnInit() {
    this.lorService
      .acceptedByMe()
      .pipe(
        map((myLorsData: any) => {
          return {
            data: myLorsData.data.map(data => {
              return {
                id: data._id,
                filesPath: data.filesPath,
                createdOn: data.createdOn,
                title: data.title,
                review: data.review,
                reviewedBy: data.reviewedBy,
                reviewedOn: data.reviewedOn,
                acceptedOn: data.acceptedOn,
                createdBy: data.createdBy
              };
            })
          };
        })
      )
      .subscribe((res: any) => {
        this.acceptedLors = res.data;
        console.log(this.acceptedLors);
      });

    this.lorService
      .rejectedByMe()
      .pipe(
        map((myLorsData: any) => {
          return {
            data: myLorsData.data.map(data => {
              return {
                id: data._id,
                filesPath: data.filesPath,
                createdOn: data.createdOn,
                title: data.title,
                review: data.review,
                reviewedBy: data.reviewedBy,
                reviewedOn: data.reviewedOn,
                acceptedOn: data.acceptedOn,
                createdBy: data.createdBy
              };
            })
          };
        })
      )
      .subscribe((res: any) => {
        this.rejectedLors = res.data;
        this.isLoading = false;
      });
  }
}

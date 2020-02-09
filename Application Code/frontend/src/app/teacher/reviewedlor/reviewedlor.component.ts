import { Component, OnInit } from "@angular/core";
import { MyLor } from "src/app/models/lor";
import { LorService } from "src/app/lor.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-reviewedlor",
  templateUrl: "./reviewedlor.component.html",
  styleUrls: ["./reviewedlor.component.css"]
})
export class ReviewedlorComponent implements OnInit {
  isLoading = true;
  course = ["Bachelors", "Masters"];
  reviewedLors: MyLor[];
  constructor(private lorService: LorService) {}

  ngOnInit() {
    this.lorService
      .reviewedByMe()
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
                acceptedBy: data.acceptedBy,
                rejectedOn: data.rejectedOn,
                rejectedBy: data.rejectedBy,
                isaccepted: data.isaccepted,
                isrejected: data.isrejected,
                createdBy: data.createdBy
              };
            })
          };
        })
      )
      .subscribe((res: any) => {
        this.reviewedLors = res.data;
        this.isLoading = false;
      });
  }
}

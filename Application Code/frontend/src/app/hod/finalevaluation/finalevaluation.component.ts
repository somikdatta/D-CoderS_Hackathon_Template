import { Component, OnInit } from "@angular/core";
import { MyLor } from "src/app/models/lor";
import { LorService } from "src/app/lor.service";
import { map } from "rxjs/operators";
import { MatDialog } from "@angular/material";
import { ErrorComponent } from "src/app/error/error.component";

@Component({
  selector: "app-finalevaluation",
  templateUrl: "./finalevaluation.component.html",
  styleUrls: ["./finalevaluation.component.css"]
})
export class FinalevaluationComponent implements OnInit {
  course = ["Bachelors", "Masters"];
  rLors: MyLor[];
  constructor(private lorService: LorService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getReviewed();
  }

  getReviewed() {
    this.lorService
      .getReviewed()
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
                createdBy: data.createdBy
              };
            })
          };
        })
      )
      .subscribe((res: any) => {
        this.rLors = res.data;
      });
  }
  accept(id: string) {
    this.lorService.acceptLor(id).subscribe(res => {
      this.dialog.open(ErrorComponent, {
        data: { message: "LOR Request Accepted" }
      });

      this.getReviewed();
    });
  }
  reject(id: string) {
    this.lorService.rejectLor(id).subscribe(res => {
      this.dialog.open(ErrorComponent, {
        data: { message: "LOR Request Rejected" }
      });
      this.getReviewed();
    });
  }
}

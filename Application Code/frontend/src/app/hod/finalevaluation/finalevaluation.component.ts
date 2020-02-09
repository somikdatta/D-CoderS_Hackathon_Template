import { Component, OnInit } from "@angular/core";
import { MyLor } from "src/app/models/lor";
import { LorService } from "src/app/lor.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-finalevaluation",
  templateUrl: "./finalevaluation.component.html",
  styleUrls: ["./finalevaluation.component.css"]
})
export class FinalevaluationComponent implements OnInit {
  rLors: MyLor[];
  constructor(private lorService: LorService) {}

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
                reviewedBy: data.reviewedBy
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
      this.getReviewed();
    });
  }
  reject(id: string) {
    this.lorService.rejectLor(id).subscribe(res => {
      this.getReviewed();
    });
  }
}

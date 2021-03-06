import { Component, OnInit } from "@angular/core";
import { LorService } from "src/app/lor.service";
import { map } from "rxjs/operators";
import { MyLor } from "src/app/models/lor";
import { MatDialog } from "@angular/material";
import { ErrorComponent } from "src/app/error/error.component";

@Component({
  selector: "app-toreview",
  templateUrl: "./toreview.component.html",
  styleUrls: ["./toreview.component.css"]
})
export class ToreviewComponent implements OnInit {
  course = ["Bachelors", "Masters"];
  tbrLors: MyLor[];

  constructor(private lorService: LorService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getToReview();
  }

  getToReview() {
    this.lorService
      .toReview()
      .pipe(
        map((myLorsData: any) => {
          return {
            data: myLorsData.data.map(data => {
              return {
                id: data._id,
                filesPath: data.filesPath,
                createdOn: data.createdOn,
                title: data.title,
                createdBy: data.createdBy
              };
            })
          };
        })
      )
      .subscribe((res: any) => {
        this.tbrLors = res.data;
      });
  }

  submitReview(id: string, review: string) {
    this.lorService.submitReview(id, review).subscribe(res => {
      this.dialog.open(ErrorComponent, {
        data: { message: "Reviewed Successfully" }
      });
      this.getToReview();
    });
  }
}

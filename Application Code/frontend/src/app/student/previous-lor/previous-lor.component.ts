import { Component, OnInit } from "@angular/core";
import { LorService } from "src/app/lor.service";
import { map } from "rxjs/operators";
import { MyLor } from "src/app/models/lor";

@Component({
  selector: "app-previous-lor",
  templateUrl: "./previous-lor.component.html",
  styleUrls: ["./previous-lor.component.css"]
})
export class PreviousLorComponent implements OnInit {
  myLors: MyLor[];
  isLoading = true;
  constructor(private lorService: LorService) {}

  ngOnInit() {
    this.lorService
      .getMyLor()
      .pipe(
        map((myLorsData: any) => {
          return {
            data: myLorsData.data.map(data => {
              return {
                id: data._id,
                filesPath: data.filesPath,
                createdOn: data.createdOn,
                title: data.title,
                isaccepted: data.isaccepted,
                isreviewed: data.isreviewed,
                reviewedBy: data.reviewedBy,
                acceptedBy: data.acceptedBy,
                reviewedOn: data.reviewedOn,
                acceptedOn: data.acceptedOn,
                rejectedBy: data.rejectedBy,
                rejectedOn: data.rejectedOn
              };
            })
          };
        })
      )
      .subscribe((res: any) => {
        this.myLors = res.data;
        console.log(this.myLors);
        this.isLoading = false;
      });
  }
  deleteLor(id: string) {
    this.lorService
      .deleteLor(id)
      .pipe(
        map((myLorsData: any) => {
          return {
            data: myLorsData.data.map(data => {
              return {
                id: data._id,
                filesPath: data.filesPath,
                createdOn: data.createdOn,
                title: data.title,
                isreviewed: data.isreviewed,
                isaccepted: data.isaccepted,
                reviewedBy: data.reviewedBy,
                acceptedBy: data.acceptedBy,
                reviewedOn: data.reviewedOn,
                acceptedOn: data.acceptedOn,
                rejectedBy: data.rejectedBy,
                rejectedOn: data.rejectedOn
              };
            })
          };
        })
      )
      .subscribe((res: any) => {
        this.myLors = res.data;
      });
  }
}

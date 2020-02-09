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
                isreviewed: data.isreviewed,
                isaccepted: data.isaccepted
              };
            })
          };
        })
      )
      .subscribe((res: any) => {
        this.myLors = res.data;
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
                isaccepted: data.isaccepted
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

import { Component, OnInit } from "@angular/core";
import { LorService } from "src/app/lor.service";
import { map } from "rxjs/operators";
import { MyLor } from "src/app/models/lor";

@Component({
  selector: "app-toreview",
  templateUrl: "./toreview.component.html",
  styleUrls: ["./toreview.component.css"]
})
export class ToreviewComponent implements OnInit {
  tbrLors: MyLor[];

  constructor(private lorService: LorService) {}

  ngOnInit() {
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
                title: data.title
              };
            })
          };
        })
      )
      .subscribe((res: any) => {
        this.tbrLors = res.data;
      });
  }
}
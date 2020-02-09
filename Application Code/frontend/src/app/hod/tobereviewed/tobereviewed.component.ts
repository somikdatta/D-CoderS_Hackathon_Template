import { Component, OnInit } from "@angular/core";
import { LorService } from "src/app/lor.service";
import { MyLor } from "src/app/models/lor";
import { map } from "rxjs/operators";

@Component({
  selector: "app-tobereviewed",
  templateUrl: "./tobereviewed.component.html",
  styleUrls: ["./tobereviewed.component.css"]
})
export class TobereviewedComponent implements OnInit {
  tbrLors: MyLor[];

  constructor(private lorService: LorService) {}

  ngOnInit() {
    this.lorService
      .getToBeReviewed()
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
        console.log(this.tbrLors);
      });
  }
}

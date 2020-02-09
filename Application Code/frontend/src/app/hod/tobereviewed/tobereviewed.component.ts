import { Component, OnInit } from "@angular/core";
import { LorService } from "src/app/lor.service";
import { MyLor } from "src/app/models/lor";
import { map } from "rxjs/operators";
import { Teacher } from "src/app/models/teacher";

@Component({
  selector: "app-tobereviewed",
  templateUrl: "./tobereviewed.component.html",
  styleUrls: ["./tobereviewed.component.css"]
})
export class TobereviewedComponent implements OnInit {
  tbrLors: MyLor[];
  teachers: Teacher[];
  course = ["Bachelors", "Masters"];

  constructor(private lorService: LorService) {}

  ngOnInit() {
    this.getToBeReviewed();

    this.lorService
      .getTeachers()
      .pipe(
        map((teachersData: any) => {
          return {
            data: teachersData.data.map(data => {
              return {
                id: data._id,
                uniqueid: data.uniqueid,
                firstname: data.name.first,
                lastname: data.name.last
              };
            })
          };
        })
      )
      .subscribe((teachers: any) => {
        this.teachers = teachers.data;
      });
  }

  getToBeReviewed() {
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

  assignTeacher(id: string, teacher: string) {
    if (!id || !teacher) {
      return;
    }
    this.lorService.assignTeacher(id, teacher).subscribe(res => {
      this.getToBeReviewed();
    });
  }
}

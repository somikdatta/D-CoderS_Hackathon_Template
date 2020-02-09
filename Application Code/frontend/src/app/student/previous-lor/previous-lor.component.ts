import { Component, OnInit } from "@angular/core";
import { LorService } from "src/app/lor.service";

@Component({
  selector: "app-previous-lor",
  templateUrl: "./previous-lor.component.html",
  styleUrls: ["./previous-lor.component.css"]
})
export class PreviousLorComponent implements OnInit {
  constructor(private lorService: LorService) {}

  ngOnInit() {
    this.lorService.getMyLor();
  }
}

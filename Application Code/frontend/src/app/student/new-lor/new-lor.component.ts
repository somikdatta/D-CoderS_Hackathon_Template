import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LorService } from "src/app/lor.service";

@Component({
  selector: "app-new-lor",
  templateUrl: "./new-lor.component.html",
  styleUrls: ["./new-lor.component.css"]
})
export class NewLorComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  constructor(private lorService: LorService) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      files: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  onSaveFiles() {
    this.isLoading = true;
    this.lorService.newLor(this.form.value.title, this.form.value.files);
    this.isLoading = false;
  }
  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files;
    this.form.patchValue({ files: file });
    this.form.get("files").updateValueAndValidity();
  }
}

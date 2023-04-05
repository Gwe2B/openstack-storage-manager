import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './add-identifier-form.component.html',
  styleUrls: ['./add-identifier-form.component.scss'],
})
export class AddIdentifierFormComponent implements OnInit {
  identifierForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddIdentifierFormComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.identifierForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      project: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}

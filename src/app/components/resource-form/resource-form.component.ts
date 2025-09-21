import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Resource } from '../../models/resource.model';

@Component({
  selector: 'app-resource-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss']
})
export class ResourceFormComponent {
  form: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ResourceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Resource | null
  ) {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [''],
      location: ['Onshore', Validators.required],
      jobRole: ['', Validators.required],
      fte: [true],
      managerName: [''],
      skills: this.fb.group({
        primary: ['', Validators.required],
        secondary: [''],
        tertiary: ['']
      })
    });

    if (data) {
      this.form.patchValue(data);
    }
  }

  save() {
    if (this.form.valid) {
      const payload = this.form.value as Resource;
      if (!payload.id) payload.id = Date.now().toString();
      this.dialogRef.close(payload);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}

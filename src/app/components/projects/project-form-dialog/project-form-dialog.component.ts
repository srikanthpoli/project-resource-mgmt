import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Project } from '../../../models/project.model';
import { Resource } from '../../../models/resource.model';

export interface ProjectDialogData {
  project?: Project;
  resources: Resource[];
}

@Component({
  selector: 'app-project-form-dialog',
  templateUrl: './project-form-dialog.component.html',
  styleUrls: ['./project-form-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class ProjectFormDialogComponent {
  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProjectFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectDialogData
  ) {
    this.projectForm = this.fb.group({
      name: [data.project?.name || '', Validators.required],
      deliveryDate: [data.project?.deliveryDate || '', Validators.required],
      devSto: [data.project?.devSto || '', Validators.required],
      baSto: [data.project?.baSto || '', Validators.required],
      leadDev: [data.project?.leadDev || '', Validators.required],
      leadBa: [data.project?.leadBa || '', Validators.required]
    });
  }

  save() {
    if (this.projectForm.valid) {
      const result: Project = {
        ...this.data.project,
        ...this.projectForm.value
      };
      this.dialogRef.close(result);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}

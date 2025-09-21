import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

export interface ResourceProjectData {
    resourceName: string;
    projects: { projectName: string; contribution?: number }[];
}

@Component({
    standalone: true,
    imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule],
    template: `
        <h2 mat-dialog-title>Projects for {{ data.resourceName }}</h2>
        <mat-dialog-content>
            <table mat-table [dataSource]="data.projects" class="mat-elevation-z2" style="width: 100%;">
                <ng-container matColumnDef="projectName">
                    <th mat-header-cell *matHeaderCellDef>Project Name</th>
                    <td mat-cell *matCellDef="let p">{{ p.projectName }}</td>
                </ng-container>

                <ng-container matColumnDef="contribution">
                    <th mat-header-cell *matHeaderCellDef>Contribution (%)</th>
                    <td mat-cell *matCellDef="let p">{{ p.contribution || '-' }}</td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="['projectName', 'contribution']"></tr>
                <tr mat-row *matRowDef="let row; columns: ['projectName', 'contribution'];"></tr>
            </table>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button (click)="close()">Close</button>
        </mat-dialog-actions>
    `,
    styles: [`
        mat-dialog-content { padding: 16px; }
        h2 { margin: 0 0 16px 0; }
    `]
})
export class ProjectTeamDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ProjectTeamDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ResourceProjectData
    ) {}

    close() {
        this.dialogRef.close();
    }
}

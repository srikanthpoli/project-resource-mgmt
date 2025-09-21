import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export interface TeamMember {
  id: number;
  name: string;
  contribution: number;
}

@Component({
  selector: 'app-view-team',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent {
  displayedColumns: string[] = ['name', 'contribution', 'actions'];
  dataSource = new MatTableDataSource<TeamMember>([]);
  newMember: TeamMember = { id: 0, name: '', contribution: 0 };
  editingId: number | null = null;
  editedMember: TeamMember = { id: 0, name: '', contribution: 0 };

 constructor(
  public dialogRef: MatDialogRef<ViewTeamComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { team: TeamMember[], resources: { name: string }[] }
) {
  this.dataSource = new MatTableDataSource<TeamMember>(data.team || []);
}

  addMember() {
    if (!this.newMember.name) return;
    const member = { ...this.newMember, id: Date.now() };
    this.dataSource.data = [...this.dataSource.data, member];
    this.newMember = { id: 0, name: '', contribution: 0 };
  }

  startEdit(member: TeamMember) {
    this.editingId = member.id;
    this.editedMember = { ...member };
  }

  saveEdit() {
    this.dataSource.data = this.dataSource.data.map(m =>
      m.id === this.editingId ? { ...this.editedMember } : m
    );
    this.cancelEdit();
  }

  cancelEdit() {
    this.editingId = null;
    this.editedMember = { id: 0, name: '', contribution: 0 };
  }

  deleteMember(id: number) {
    this.dataSource.data = this.dataSource.data.filter(m => m.id !== id);
  }

  close() {
    // return updated team to parent
    this.dialogRef.close(this.dataSource.data);
  }
}

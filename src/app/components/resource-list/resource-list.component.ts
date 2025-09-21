import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { Resource } from '../../models/resource.model';
import { ResourceService } from '../../services/resource.service';
import { ResourceFormComponent } from '../resource-form/resource-form.component';
import { ProjectService } from '../../services/project.service';
import { ProjectTeamDialogComponent } from './project-team-dialogue.component';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ResourceFormComponent
  ],
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
  providers: [ResourceService]
})
export class ResourceListComponent implements OnInit {
  resources: Resource[] = [];
  projects: any[] = [];
displayedColumns = ['name', 'email', 'jobRole', 'location', 'viewProjects', 'actions'];

 constructor(private svc: ResourceService, private projectSvc: ProjectService, private dialog: MatDialog) {}

  ngOnInit(): void {
      console.log(this.resources.length); // now safe
    this.load();
  }

  load() {
    this.svc.getResources().subscribe(r => (this.resources = r));
    this.projectSvc.getProjects().subscribe(p => (this.projects = p));
  }

  viewProjects(resource: Resource) {
const assignedProjects = this.projects
.filter(proj => proj.team?.some((member: any) => member.id === resource.id))
.map(proj => ({
projectName: proj.name,
contribution: proj.team.find((member: any) => member.id === resource.id)?.contribution
}));


this.dialog.open(ProjectTeamDialogComponent, {
width: '600px',
data: { resource, projects: assignedProjects, viewOnly: true }
});
}
  add() {
    const ref = this.dialog.open(ResourceFormComponent, { width: '600px', data: null });
    ref.afterClosed().subscribe(result => {
      if (result) this.svc.addResource(result).subscribe(() => this.load());
    });
  }

  edit(resource: Resource) {
    const ref = this.dialog.open(ResourceFormComponent, { width: '600px', data: resource });
    ref.afterClosed().subscribe(result => {
      if (result) this.svc.updateResource(result).subscribe(() => this.load());
    });
  }

  remove(resource: Resource) {
    if (confirm(`Delete ${resource.name}?`)) {
      this.svc.deleteResource(resource.id).subscribe(() => this.load());
    }
  }
}

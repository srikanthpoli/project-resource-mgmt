import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProjectFormDialogComponent } from '../project-form-dialog/project-form-dialog.component';
import { ViewTeamComponent } from '../project-team/view-team.component';
import { Project, TeamMember } from '../../../models/project.model';
import { Resource } from '../../../models/resource.model';
import { ResourceService } from '../../../services/resource.service';
import { ProjectService } from '../../../services/project.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    ProjectFormDialogComponent
  ]
})
export class ProjectManagementComponent implements OnInit {
  projects: Project[] = [];
  resources: Resource[] = [];
  dataSource = new MatTableDataSource<Project>([]);
  displayedColumns: string[] = ['name', 'deliveryDate', 'devSto', 'baSto', 'leadDev', 'leadBa', 'team', 'actions'];

  constructor(
    private dialog: MatDialog,
    private resourceService: ResourceService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.loadResourcesAndProjects();
  }

  private loadResourcesAndProjects() {
    this.resourceService.getResources().pipe(take(1)).subscribe(resources => {
      this.resources = resources;
      this.refreshProjects();
    });
  }

  private refreshProjects() {
    this.projectService.getProjects().pipe(take(1)).subscribe(projects => {
      this.projects = projects;
      this.dataSource.data = [...this.projects];
    });
  }

  addProjectPopup() {
    const dialogRef = this.dialog.open(ProjectFormDialogComponent, {
      data: { resources: this.resources },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: Project) => {
      if (result) {
        this.projectService.addProject(result).subscribe(() => this.refreshProjects());
      }
    });
  }

  editProjectPopup(project: Project) {
    const dialogRef = this.dialog.open(ProjectFormDialogComponent, {
      data: { project, resources: this.resources },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: Project) => {
      if (result) {
        this.projectService.updateProject(result).subscribe(() => this.refreshProjects());
      }
    });
  }

  deleteProject(project: Project) {
    const confirmed = confirm(`Are you sure you want to delete project "${project.name}"?`);
    if (confirmed) {
      this.projectService.deleteProject(project.id).subscribe(() => this.refreshProjects());
    }
  }

  openTeam(project: Project) {
    const dialogRef = this.dialog.open(ViewTeamComponent, {
      width: '800px',
      data: { team: project.team || [], resources: this.resources }
    });

    dialogRef.afterClosed().subscribe((result: TeamMember[] | undefined) => {
      if (result) {
        project.team = result;
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }
}
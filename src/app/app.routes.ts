import { Routes } from '@angular/router';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { ProjectManagementComponent } from './components/projects/project-management/project-management.component';

export const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectManagementComponent },
  { path: 'resources', component: ResourceListComponent }
];

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'api/projects';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  addProject(project: Project): Observable<Project> {
    if (!project.id) {
      project.id = Date.now().toString();
    }
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${project.id}`, project);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
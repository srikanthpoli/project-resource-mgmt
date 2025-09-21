import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource } from '../models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private apiUrl = 'api/resources';

  constructor(private http: HttpClient) { }

  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.apiUrl);
  }

  addResource(resource: Resource): Observable<Resource> {
    if (!resource.id) {
      resource.id = Date.now().toString();
    }
    return this.http.post<Resource>(this.apiUrl, resource);
  }

  updateResource(resource: Resource): Observable<Resource> {
    return this.http.put<Resource>(`${this.apiUrl}/${resource.id}`, resource);
  }

  deleteResource(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

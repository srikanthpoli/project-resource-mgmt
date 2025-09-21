import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Resource } from '../models/resource.model';
import { Project, TeamMember } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const resources: Resource[] = [
      {
        id: 'R001',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        mobile: '+1-123-456-7890',
        location: 'Onshore',
        jobRole: 'Developer',
        fte: true,
        managerName: 'Robert King',
        skills: { primary: 'Java', secondary: 'Angular', tertiary: 'AWS' }
      },
      {
        id: 'R002',
        name: 'John Smith',
        email: 'john@example.com',
        mobile: '+1-555-222-1111',
        location: 'Offshore',
        jobRole: 'Dev STO',
        fte: true,
        managerName: 'Michael Scott',
        skills: { primary: 'Project Management', secondary: 'Agile' }
      },
      {
        id: 'R003',
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        mobile: '+1-333-444-5555',
        location: 'Onshore',
        jobRole: 'BA STO',
        fte: true,
        managerName: 'Sarah Lee',
        skills: { primary: 'Requirements', secondary: 'UML' }
      },
      {
        id: 'R004',
        name: 'Diana Prince',
        email: 'diana@example.com',
        mobile: '+1-777-888-9999',
        location: 'Offshore',
        jobRole: 'Lead Dev',
        fte: true,
        managerName: 'Bruce Wayne',
        skills: { primary: 'Spring Boot', secondary: 'Microservices' }
      }
    ];

    const projects: Project[] = [
      {
        id: 'P002',
        name: 'Project Apollo',
        deliveryDate: '2025-12-31',
        devSto: 'Alice Johnson',
        baSto: 'Charlie Brown',
        leadDev: 'Diana Prince',
        leadBa: 'John Smith',
        team: [
          { id: 'T001', name: 'Alice Johnson', contribution: 50 },
          { id: 'T002', name: 'John Smith', contribution: 50 }
        ]
      },
      {
        id: 'P002',
        name: 'Project Zeus',
        deliveryDate: '2026-03-15',
        devSto: 'Diana Prince',
        baSto: 'John Smith',
        leadDev: 'Alice Johnson',
        leadBa: 'Charlie Brown',
        team: [
          { id: 'T003', name: 'Diana Prince', contribution: 70 },
          { id: 'T004', name: 'Charlie Brown', contribution: 30 }
        ]
      }
    ];

    return { resources, projects };
  }

  // optional: string id generator
  genId<T extends { id: any }>(collection: T[], collectionName: string): any {
    return Date.now().toString();
  }
}

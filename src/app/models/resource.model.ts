export interface Skills {
  primary: string;
  secondary?: string;
  tertiary?: string;
}

export interface Resource {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  location: 'Onshore' | 'Offshore';
  jobRole: string;       // e.g. Developer, BA, STO, Lead Dev
  fte: boolean;
  managerName?: string;
  skills: Skills;
}

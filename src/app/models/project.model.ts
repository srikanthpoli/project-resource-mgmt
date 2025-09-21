export interface Project {
  id: string;
  name: string;
  deliveryDate: string;
  devSto: string;
  baSto: string;
  leadDev: string;
  leadBa: string;
  team: TeamMember[];
}

export interface TeamMember {
  id: string;
  name: string;
  contribution: number; // %
}

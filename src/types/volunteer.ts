export type Category = string
  

export interface VolunteerOpportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  datePosted: string;
  category: Category;
  description: string;
  duration: string;
  skillsRequired: string[];
  contactEmail: string;
}

export type Category =
  | "Education"
  | "Environment"
  | "Health"
  | "Animals"
  | "Community"
  | "Crisis Support"
  | "Arts & Culture"
  | "Sports & Recreation"
  | "Technology"
  | "Food & Hunger";

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

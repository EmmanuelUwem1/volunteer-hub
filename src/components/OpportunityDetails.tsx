import React from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { VolunteerOpportunity } from "@/types/volunteer";
import { useToast } from "@/hooks/use-toast";

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

interface OpportunityDetailsProps {
  opportunity: VolunteerOpportunity;
}

const OpportunityDetails: React.FC<OpportunityDetailsProps> = ({
  opportunity,
}) => {
  const { toast } = useToast();
  const {
    title,
    organization,
    location,
    datePosted,
    category,
    description,
    duration,
    skillsRequired,
    contactEmail,
  } = opportunity;

  const handleApply = () => {
    // In a real app, this would handle the application process
    // For now, we'll just show a toast message
    toast({
      title: "Application sent!",
      description: `Your interest in "${title}" has been sent to the organization.`,
    });
  };

  const handleContact = () => {
    // This would typically open an email client or a contact form
    window.location.href = `mailto:${contactEmail}?subject=Regarding Volunteer Opportunity: ${title}`;
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
        <DialogDescription className="text-base font-medium text-gray-700">
          {organization}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Location:</span>
            <span>{location}</span>
          </div>
          <Badge
            variant="outline"
            className="bg-volunteer-light text-volunteer-primary"
          >
            {category}
          </Badge>
        </div>

        <Separator />

        <div>
          <h4 className="font-semibold mb-2">Description</h4>
          <p className="text-gray-700">{description}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Duration</h4>
          <p className="text-gray-700">{duration}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Skills Required</h4>
          <div className="flex flex-wrap gap-2">
            {skillsRequired.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="bg-volunteer-light text-volunteer-dark"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-gray-700">{contactEmail}</p>
        </div>

        <div className="text-sm text-gray-500">
          Posted on {formatDate(datePosted)}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handleContact}
          className="border-volunteer-primary text-volunteer-primary hover:bg-volunteer-primary hover:text-white"
        >
          Contact Organization
        </Button>
        <Button
          onClick={handleApply}
          className="bg-volunteer-primary hover:bg-blue-600 transition-colors"
        >
          Apply Now
        </Button>
      </div>
    </>
  );
};

export default OpportunityDetails;

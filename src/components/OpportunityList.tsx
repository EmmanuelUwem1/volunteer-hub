import React from "react";
import OpportunityCard from "./OpportunityCard";
import { VolunteerOpportunity } from "@/types/volunteer";

interface OpportunityListProps {
  opportunities: VolunteerOpportunity[];
}

const OpportunityList: React.FC<OpportunityListProps> = ({ opportunities }) => {
  if (opportunities.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <h3 className="text-lg font-medium text-gray-500">
          No opportunities found
        </h3>
        <p className="text-gray-400 mt-2">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {opportunities.map((opportunity) => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </div>
  );
};

export default OpportunityList;

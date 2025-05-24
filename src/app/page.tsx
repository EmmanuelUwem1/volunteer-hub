"use client";
import React, { useState, useMemo, useEffect } from "react";
import SearchFilters from "@/components/SearchFilters";
import OpportunityList from "@/components/OpportunityList";
import { volunteerOpportunities } from "@/data/volunteerOpportunities";
import PageTransitionEffect from "@/components/PageTransitionEffect";
import { VolunteerOpportunity } from "@/types/volunteer";

function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [volunteerOpportunitiesState, setVolunteerOpportunitiesState] =
    useState<VolunteerOpportunity[]>([]);

  useEffect(() => {
    if(localStorage){
    const locallyStored = localStorage.getItem("volunteerOpportunities");

    if (locallyStored) {
      try {
        const parsedData = JSON.parse(locallyStored);
        setVolunteerOpportunitiesState(
          Array.isArray(parsedData) ? parsedData : []
        );
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        setVolunteerOpportunitiesState([]);
      }
    } else {
      localStorage.setItem(
        "volunteerOpportunities",
        JSON.stringify(volunteerOpportunities)
      );
      setVolunteerOpportunitiesState(volunteerOpportunities);
    }
  }
  }, []);

  // Filter opportunities based on search query and selected category
  const filteredOpportunities = useMemo(() => {
    if (!Array.isArray(volunteerOpportunitiesState)) {
      console.error(
        "volunteerOpportunitiesState is not an array:",
        volunteerOpportunitiesState
      );
      return [];
    }

    return volunteerOpportunitiesState.filter(
      (opportunity: VolunteerOpportunity) => {
        const searchMatch =
          searchQuery === "" ||
          opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opportunity.organization
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        const categoryMatch =
          selectedCategory === "all" ||
          opportunity.category === selectedCategory;

        return searchMatch && categoryMatch;
      }
    );
  }, [searchQuery, selectedCategory, volunteerOpportunitiesState]);

  return (
    <PageTransitionEffect>
      <div className="">
        <SearchFilters
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
        />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {filteredOpportunities?.length ?? 0} Opportunities Available
            </h2>
          </div>

          <OpportunityList opportunities={filteredOpportunities ?? []} />
        </div>
      </div>
    </PageTransitionEffect>
  );
}

export default Page;

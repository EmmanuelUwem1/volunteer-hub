"use client"
import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import OpportunityList from "@/components/OpportunityList";
import { volunteerOpportunities } from "@/data/volunteerOpportunities";
// import { VolunteerOpportunity } from "@/types/volunteer";
const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter opportunities based on search query and selected category
  const filteredOpportunities = useMemo(() => {
    return volunteerOpportunities.filter((opportunity) => {
      // Filter by search query
      const searchMatch =
        searchQuery === "" ||
        opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opportunity.organization
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      // Filter by category
      const categoryMatch =
        selectedCategory === "all" || opportunity.category === selectedCategory;

      return searchMatch && categoryMatch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <SearchFilters
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
        />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {filteredOpportunities.length} Opportunities Available
            </h2>
          </div>

          <OpportunityList opportunities={filteredOpportunities} />
        </div>
      </main>

      <footer className="w-full py-6 bg-white border-t border-gray-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} VolunteerHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

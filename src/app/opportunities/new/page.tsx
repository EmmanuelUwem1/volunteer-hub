"use client"
import PageTransitionEffect from "@/components/PageTransitionEffect";
import AddOpportunityForm from "@/components/AddOpportunityForm";

export default function NewOpportunityPage() {
    return (
      <PageTransitionEffect>
        <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 lg:px-16 py-8">
          <AddOpportunityForm />
        </div>
      </PageTransitionEffect>
    );
}
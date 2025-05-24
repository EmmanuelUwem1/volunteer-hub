"use client"
import PageTransitionEffect from "@/components/PageTransitionEffect";
import AddOpportunityForm from "@/components/AddOpportunityForm";

export default function NewOpportunityPage() {
    return (
      <PageTransitionEffect>
        <div className="mx-auto flex-col my-8 rounded-3xl border border-gray-200 items-center justify-center min-h-screen w-fit px-4 sm:px-6 lg:px-16 py-8">
          <AddOpportunityForm />
        </div>
      </PageTransitionEffect>
    );
}
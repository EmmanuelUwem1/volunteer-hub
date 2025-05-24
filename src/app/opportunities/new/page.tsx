"use client"
import PageTransitionEffect from "@/components/PageTransitionEffect";


export default function NewOpportunityPage() {
    return (
      <PageTransitionEffect>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">Create a New Opportunity</h1>
          <form className="w-full max-w-lg">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Opportunity Title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* Add more form fields as needed */}
          </form>
        </div>
      </PageTransitionEffect>
    );
}
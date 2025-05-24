"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/data/volunteerOpportunities";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { useToast } from "@/hooks/use-toast";
// import { Category } from "@/types/volunteer";

const AddOpportunityForm = () => {
  // const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);


  interface OpportunityForm {
    id: string;
    title: string;
    organization: string;
    location: string;
    datePosted: string;
    category: string;
    description: string;
    duration: string;
    skillsRequired: string[];
    contactEmail: string;
  }

  const [form, setForm] = useState<OpportunityForm>({
    id: "",
    title: "",
    organization: "",
    location: "",
    datePosted: "",
    category: "",
    description: "",
    duration: "",
    skillsRequired: [],
    contactEmail: "",
  });

  // Remove duplicate interface OpportunityForm

  // Updated AddOpportunity to assign a new id based on the last id in the array
  function AddOpportunity(form: OpportunityForm): string | undefined {
    if (typeof window !== "undefined") {
      const opportunitiesArray = JSON.parse(
        localStorage.getItem("volunteerOpportunities") || "[]"
      );
      let newId = "1";
      if (opportunitiesArray.length > 0) {
        const lastId = parseInt(
          opportunitiesArray[opportunitiesArray.length - 1].id,
          10
        );
        newId = isNaN(lastId) ? "1" : (lastId + 1).toString();
      }
      const newOpportunity = { ...form, id: newId };
      opportunitiesArray.push(newOpportunity);
      localStorage.setItem(
        "volunteerOpportunities",
        JSON.stringify(opportunitiesArray)
      );
      return newId;
    }
    return undefined;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "skillsRequired") {
      setForm((prev) => ({
        ...prev,
        skillsRequired: value
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (value: string) => {
    setForm((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form validation
    if (
      !form.title ||
      !form.organization ||
      !form.category ||
      !form.description ||
      !form.contactEmail
    ) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Set datePosted and add opportunity
    const opportunityWithDate = {
      ...form,
      datePosted: new Date().toISOString(),
    };
    AddOpportunity(opportunityWithDate);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        "Your volunteer opportunity has been successfully created!"
      );

      setForm({
        id: "",
        title: "",
        organization: "",
        location: "",
        category: "",
        datePosted: "",
        description: "",
        duration: "",
        skillsRequired: [],
        contactEmail: "",
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-start">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 className="flex w-full text-center items-center justify-center font-extrabold text-lg py-2">
        {" "}
        Add Volunteer Opportunity{" "}
      </h1>

      <span className="flex w-full text-center items-center justify-center font-normal text-sm sm:text-base">
        {" "}
        Fill out the form below to create a new volunteer opportunity posting.
      </span>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6 flex w-fit">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-right">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., Beach Cleanup Volunteer"
              required
            />
          </div>

          <div>
            <Label htmlFor="organization" className="text-right">
              Organization <span className="text-red-500">*</span>
            </Label>
            <Input
              id="organization"
              name="organization"
              value={form.organization}
              onChange={handleChange}
              placeholder="e.g., Ocean Guardians"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g., San Francisco, CA or Remote"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-right">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={form.category}
                onValueChange={handleCategoryChange}
                required
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-right">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Provide details about the volunteer opportunity"
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
            <Input
              id="duration"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="e.g., 3 months, 4 hours/week"
            />
          </div>

          <div>
            <Label htmlFor="skillsRequired" className="text-right">
              Skills Required (comma separated)
            </Label>
            <Input
              id="skillsRequired"
              name="skillsRequired"
              value={form.skillsRequired.join(", ")}
              onChange={handleChange}
              placeholder="e.g., Teaching, Communication, Patience"
            />
          </div>

          <div>
            <Label htmlFor="contactEmail" className="text-right">
              Contact Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={form.contactEmail}
              onChange={handleChange}
              placeholder="e.g., volunteer@organization.org"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-700 transition-colors flex w-full"
          >
            {isSubmitting ? "Creating..." : "Create Opportunity"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddOpportunityForm;

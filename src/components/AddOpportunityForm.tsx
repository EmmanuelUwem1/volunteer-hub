import React, { useState } from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { useToast } from "@/hooks/use-toast";
import { Category } from "@/types/volunteer";

const AddOpportunityForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    organization: "",
    location: "",
    category: "",
    description: "",
    duration: "",
    skillsRequired: "",
    contactEmail: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Opportunity Added!",
        description:
          "Your volunteer opportunity has been successfully created.",
      });

      // In a real application, we would add the new opportunity to our data store
      // For now, just reset the form
      setForm({
        title: "",
        organization: "",
        location: "",
        category: "",
        description: "",
        duration: "",
        skillsRequired: "",
        contactEmail: "",
      });
    }, 1000);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add Volunteer Opportunity</DialogTitle>
        <DialogDescription>
          Fill out the form below to create a new volunteer opportunity posting.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
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
              value={form.skillsRequired}
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
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-volunteer-primary hover:bg-blue-600 transition-colors"
          >
            {isSubmitting ? "Creating..." : "Create Opportunity"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddOpportunityForm;

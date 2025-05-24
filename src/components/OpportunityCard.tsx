"use client";
import {motion} from "framer-motion";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { VolunteerOpportunity } from "@/types/volunteer";
import OpportunityDetails from "./OpportunityDetails";

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

interface OpportunityCardProps {
  opportunity: VolunteerOpportunity;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const { title, organization, location, datePosted, category } = opportunity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-md animate-fade-in">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
              {title}
            </h3>
            <Badge
              variant="outline"
              className="bg-volunteer-light text-volunteer-primary border-volunteer-primary"
            >
              {category}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 font-medium">{organization}</p>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-sm text-gray-500">{location}</p>
        </CardContent>

        <CardFooter className="pt-2 flex justify-between items-center border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Posted {formatDate(datePosted)}
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-volunteer-primary border-volunteer-primary hover:bg-volunteer-primary"
              >
                Details
              </Button>
            </DialogTrigger>
           
              <DialogContent className="sm:max-w-[600px]">
                <OpportunityDetails opportunity={opportunity} />
              </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default OpportunityCard;

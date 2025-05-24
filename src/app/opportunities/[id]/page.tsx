
import PageTransitionEffect from "@/components/PageTransitionEffect";
import { volunteerOpportunities } from "@/data/volunteerOpportunities";
interface PageProps {

    params: Promise<{ id: string }>;
  
  
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params; // Await the params since it's a Promise
  const post = volunteerOpportunities.find(
    (opportunity) => opportunity.id === resolvedParams.id
  );

  if (!post) {
    return (
      <PageTransitionEffect>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-lg">
            The post you are looking for does not exist.
          </p>
        </div>
      </PageTransitionEffect>
    );
  }

  return (
    <PageTransitionEffect>
      <div>My Post: {resolvedParams.id}</div>
    </PageTransitionEffect>
  );
}


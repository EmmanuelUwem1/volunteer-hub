import PageTransitionEffect from "@/components/PageTransitionEffect";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PageTransitionEffect>
      <div>My Post: {id}</div>
    </PageTransitionEffect>
  );
}

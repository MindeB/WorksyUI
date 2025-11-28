import { redirect } from "next/navigation";

interface ServiceGroupPageProps {
  params: Promise<{
    group: string;
  }>;
}

// Redirect old group URLs to new category URLs
const groupRedirects: Record<string, string> = {
  interior: "/services/category/home",
  exterior: "/services/category/exterior",
  "lawn-garden": "/services/category/garden",
  additional: "/services/category/other",
};

export default async function ServiceGroupPage({ params }: ServiceGroupPageProps) {
  const { group } = await params;
  const redirectUrl = groupRedirects[group];

  if (redirectUrl) {
    redirect(redirectUrl);
  }

  // If no redirect found, go to all services
  redirect("/services");
}

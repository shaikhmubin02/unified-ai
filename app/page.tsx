import UnifiedMain from "@/components/UnifiedMain";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { headers } from 'next/headers';

export default function Home() {
  const { userId } = auth();
  
  // Allow access to auth-related routes, redirect to landing for other unauthenticated access
  if (!userId) {
    const allowedRoutes = ['/sign-in', '/sign-up', '/landing'];
    const headersList = headers();
    const currentPath = headersList.get('x-pathname') || '/';
    
    if (!allowedRoutes.includes(currentPath)) {
      redirect("/landing");
    }
  }
  
  return (
    <UnifiedMain />
  );
}

"use client"; // Make sure this is lowercase to work with Next.js 13+

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function ClientPage() {
  const user = useCurrentUser();

  return (
    <UserInfo label="👤 Client Component" user={user} />
  );
}

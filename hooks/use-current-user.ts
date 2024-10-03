import { useSession } from "next-auth/react";

// Custom hook to get the current user session
export const useCurrentUser = () => {
  const { data: session } = useSession(); // Ensure you're using `data: session` destructuring.
  return session?.user;
};

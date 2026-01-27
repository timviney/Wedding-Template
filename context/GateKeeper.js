import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function Gatekeeper({ children }) {
  const router = useRouter();
  const { isAuthed, ready } = useAuth();

  useEffect(() => {
    if (ready && !isAuthed && router.pathname !== "/enter") {
      router.replace("/enter");
    }
  }, [ready, isAuthed, router]);

  if (!ready) {
    return <div className="min-h-screen bg-white" />;
  }

  return children;
}

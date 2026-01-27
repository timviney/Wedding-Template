import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Protected({ children }) {
  const { isAuthed } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthed) {
      router.replace("/enter");
    }
  }, [isAuthed]);

  if (!isAuthed) return null;

  return children;
}

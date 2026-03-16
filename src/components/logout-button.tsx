"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg border border-border hover:border-muted text-sm text-muted hover:text-foreground transition-colors"
    >
      Log out
    </button>
  );
}

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  GlassButton,
  GlassCard,
  GlassInput,
  statusColors,
  textColors,
  brandColors,
} from "wens-liquid-glass-design-system";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <GlassCard padding="lg" className="w-full max-w-sm">
        <form onSubmit={handleLogin} className="space-y-4">
          <h1 className="text-2xl font-bold text-center">Log in to Linora</h1>

          {error && (
            <p className="text-sm text-center" style={{ color: statusColors.error.base }}>
              {error}
            </p>
          )}

          <GlassInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <GlassInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <GlassButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Logging in..." : "Log in"}
          </GlassButton>

          <p className="text-sm text-center" style={{ color: textColors.muted }}>
            No account?{" "}
            <Link href="/signup" className="hover:underline" style={{ color: brandColors.accent }}>
              Sign up
            </Link>
          </p>
        </form>
      </GlassCard>
    </main>
  );
}

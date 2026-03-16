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

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
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
        <form onSubmit={handleSignup} className="space-y-4">
          <h1 className="text-2xl font-bold text-center">Create your account</h1>

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
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />

          <GlassButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Creating account..." : "Sign up"}
          </GlassButton>

          <p className="text-sm text-center" style={{ color: textColors.muted }}>
            Already have an account?{" "}
            <Link href="/login" className="hover:underline" style={{ color: brandColors.accent }}>
              Log in
            </Link>
          </p>
        </form>
      </GlassCard>
    </main>
  );
}

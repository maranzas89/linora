import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAnalyses } from "@/lib/queries";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const analyses = await getAnalyses(supabase, user.id);
    return NextResponse.json(analyses);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}

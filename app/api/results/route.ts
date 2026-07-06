import { NextResponse } from "next/server";
import { createResult } from "@/lib/db/results";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name : null;
    const result = await createResult(name);

    return NextResponse.json({
      id: result.id,
      url: `/results/${result.id}`,
    });
  } catch (error) {
    console.error("Failed to create result", error);
    return NextResponse.json(
      { error: "Failed to create result" },
      { status: 500 }
    );
  }
}
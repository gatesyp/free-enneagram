import { NextResponse } from "next/server";
import { getResult, updateResult } from "@/lib/db/results";
import { QUESTIONS } from "@/lib/questions";

function parseAnswers(value: unknown): (number | null)[] | null {
  if (!Array.isArray(value) || value.length !== QUESTIONS.length) return null;
  return value.map((answer) =>
    typeof answer === "number" && answer >= 1 && answer <= 5 ? answer : null
  );
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await getResult(id);
    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch result", error);
    return NextResponse.json({ error: "Failed to fetch result" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const answers = parseAnswers(body.answers);
    if (!answers) {
      return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
    }

    const result = await updateResult(id, answers);
    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to update result", error);
    return NextResponse.json(
      { error: "Failed to update result" },
      { status: 500 }
    );
  }
}
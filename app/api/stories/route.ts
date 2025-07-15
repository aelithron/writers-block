import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_request", message: "Request couldn't be parsed, check that you sent valid JSON!" }, { status: 400 });
  }
  if (!body.title || (body.title as string).trim().length === 0) return NextResponse.json({ error: "invalid_title", message: "Request has no title." }, { status: 400 });
  if (!body.type || (body.type !== "chaptered" && body.type !== "short")) return NextResponse.json({ error: "invalid_type", message: "Request has no type, or it isn't a valid type." }, { status: 400 });
  const storyID = new ObjectId();
  // TODO: Write to database when that is ready
  return NextResponse.json({ message: "Successfully created your story!", storyID }, { status: 201 });
}
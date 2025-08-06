import { auth } from "@/auth";
import client, { getStory } from "@/utils/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const session = await auth();
  if (!session || !session.user) return NextResponse.json({ error: "unauthorized", message: "Not logged in, please log in to continue." }, { status: 401 });
  const user = session.user;
  if (user.email === null || user.email === undefined) return NextResponse.json({ error: "invalid_profile", message: "You don't have an email in your profile, try logging back in." }, { status: 400 });
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_request", message: "Request couldn't be parsed, check that you sent valid JSON!" }, { status: 400 });
  }
  if (!body.id || (body.id as string).trim().length === 0) return NextResponse.json({ error: "invalid_id", message: "Request has no id." }, { status: 400 });
  let id: ObjectId;
  try {
    id = new ObjectId((body.id as string).trim());
  } catch {
    if (!body.id || (body.id as string).trim().length === 0) return NextResponse.json({ error: "invalid_id", message: "Request has an invalid id." }, { status: 400 });
  }
  const story = await getStory(body.id, user.email);
  if (!story) return NextResponse.json({ error: "not_found", message: "Requested story couldn't be found!" }, { status: 404 });
  if (!body.title || (body.title as string).trim().length === 0) return NextResponse.json({ error: "invalid_title", message: "Request has no title." }, { status: 400 });
  
  await client.db(process.env.MONGODB_DB).collection("stories");
}
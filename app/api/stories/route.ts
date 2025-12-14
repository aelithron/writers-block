import { auth } from "@/auth";
import getClient, { getStory } from "@/utils/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
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
  if (!body.title || (body.title as string).trim().length === 0) return NextResponse.json({ error: "invalid_title", message: "Request has no title." }, { status: 400 });
  if (!body.type || (body.type !== "chaptered" && body.type !== "short")) return NextResponse.json({ error: "invalid_type", message: "Request has no type, or it isn't a valid type." }, { status: 400 });
  const storyID = new ObjectId();
  await getClient().db(process.env.MONGODB_DB).collection("stories").insertOne({ _id: storyID, owner: user.email, title: body.title, description: "", type: body.type, parts: [] });
  return NextResponse.json({ message: "Successfully created your story!", storyID }, { status: 201 });
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
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
  const story = await getStory(body.id, user.email);
  if (!story) return NextResponse.json({ error: "not_found", message: "Requested story couldn't be found!" }, { status: 404 });

  if (body.title && (body.title as string).trim().length !== 0) story.title = body.title;
  if (body.type && (body.type === "chaptered" || body.type === "short")) story.type = body.type;
  if (body.description && (body.description as string).trim().length !== 0) story.description = body.description;
  await getClient().db(process.env.MONGODB_DB).collection("stories").updateOne({ _id: new ObjectId(body.id as string) }, {
    $set: story
  });
  
  return NextResponse.json({ message: "Successfully edited your story!" });
}
import { auth } from "@/auth";
import { getStory } from "@/utils/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const session = await auth();
  if (!session || !session.user) return NextResponse.json({ error: "unauthorized", message: "Not logged in, please log in to continue." }, { status: 401 });
  const user = session.user;
  if (user.email === null || user.email === undefined) return NextResponse.json({ error: "invalid_profile", message: "You don't have an email in your profile, try logging back in." }, { status: 400 });
  let id: ObjectId;
  try {
    id = new ObjectId((req.nextUrl.searchParams.get("id") as string).trim());
  } catch {
    return NextResponse.json({ error: "invalid_id", message: "Request URL has an invalid/missing id." }, { status: 400 });
  }
  const story = await getStory(id.toString(), user.email);
  if (!story) return NextResponse.json({ error: "not_found", message: "Requested story couldn't be found!" }, { status: 404 });
  let storyText = `${story.title} (${story.type})\n\n${story.description ? story.description : "Description is empty!"}\n-----\n\n`;
  if (story.type === "chaptered") {
    if (story.parts.length < 1) storyText = storyText + "Story has no chapters!\n";
    story.parts.sort((a, b) => a.number - b.number);
    for (const part of story.parts) storyText = storyText + `Chapter ${part.number} - ${part.title}\n${part.text}\n\n`;
  } else {
    if (story.parts[0].text) {
      storyText = storyText + story.parts[0].text;
    } else {
      storyText = storyText + "Story is empty!";
    }
  }
  return new NextResponse(storyText);
}
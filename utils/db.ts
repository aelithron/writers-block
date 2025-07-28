import { Story } from "@/writersblock";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}
if (!uri) throw new Error("No MONGODB_URI environment variable.");
const client: MongoClient = new MongoClient(uri, options);
export default client;

export async function getAllStories(user: string): Promise<Story[]> {
  return await client.db(process.env.MONGODB_DB).collection<Story>("stories").find({ user: user }).toArray();
}
export async function getStory(storyID: string, user: string): Promise<Story | null> {
  let _id;
  try {
    _id = new ObjectId(storyID);
  } catch {
    return null;
  }
  const story = await client.db(process.env.MONGODB_DB).collection<Story>("stories").findOne({ _id });
  if (!story || story.owner !== user) return null;
  return story;
}
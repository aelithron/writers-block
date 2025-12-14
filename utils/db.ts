import { Story } from "@/writersblock";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
}

let client: MongoClient | undefined;
export default function getClient() {
  if (!client) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("There is no MONGODB_URI environment variable, please include one!")
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line prefer-const
      let globalWithMongo = global as typeof globalThis & { _mongoClient?: MongoClient; }
      if (!globalWithMongo._mongoClient) globalWithMongo._mongoClient = new MongoClient(uri, options);
      client = globalWithMongo._mongoClient;
    } else client = new MongoClient(uri, options);
  }
  return client;
}

export async function getAllStories(user: string): Promise<Story[]> {
  return await getClient().db(process.env.MONGODB_DB).collection<Story>("stories").find({ owner: user }).toArray();
}
export async function getStory(storyID: string, user: string): Promise<Story | null> {
  let _id;
  try {
    _id = new ObjectId(storyID);
  } catch {
    return null;
  }
  const story = await getClient().db(process.env.MONGODB_DB).collection<Story>("stories").findOne({ _id });
  if (!story || story.owner !== user) return null;
  return story;
}
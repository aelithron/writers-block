import { ObjectId } from "mongodb";
import { Story, StoryPart } from "@/writersblock";

// This purely exists because I want to build the app before connecting it to a database - nova
export function fakeGetStories(): Story[] {
  const storyList: Story[] = [];
  storyList.push({ _id: new ObjectId("6875fe056948cc57ccff8687"), owner: "aelithron@gmail.com", title: "hi, world :3c", description: "meow mrow mrrp nya", type: "short", parts: []  });
  const story1Part: StoryPart = { number: 1, title: "The Test Part", text: "Hello, this is a long part because why not, cats and dogs are both cute" };
  const story1Part2: StoryPart = { number: 2, title: "Another!", text: "A much shorter part" };
  storyList.push({ _id: new ObjectId("6875fe056948cc57ccff8688"), owner: "aelithron@gmail.com", title: "Test Story 1", description: "This is an example", type: "chaptered", parts: [story1Part, story1Part2]  });
  storyList.push({ _id: new ObjectId("6875fe056948cc57ccff8689"), owner: "aelithron@gmail.com", title: "Test Story 2", description: "Another example, but with a very, very, long description. This is intentionally a pretty long text block :3", type: "chaptered", parts: []  });
  const shortStoryPart: StoryPart = { number: 2, title: "", text: "A bunch of writing stuff lol" };
  storyList.push({ _id: new ObjectId("6875fe056948cc57ccff868a"), owner: "aelithron@gmail.com", title: "Short Story", description: "This is an example of a short story", type: "short", parts: [shortStoryPart]  });
  return storyList;
}
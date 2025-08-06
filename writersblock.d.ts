import { ObjectId } from "mongodb"

export type Story = {
  _id: ObjectId
  owner: string
  title: string
  description: string
  type: "short" | "chaptered"
  parts: StoryPart[]
}
export type StoryPart = {
  number: number
  title: string | null
  text: string
}
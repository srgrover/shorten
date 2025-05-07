import { DateTime } from "next-auth/providers/kakao";
import { User } from "./user.interface";

export interface Slug {
  id: string;
  slug: string;
  url: string;
  clicks: number;
  createdAt: DateTime;
  updatedAt: DateTime;
  user: User
}
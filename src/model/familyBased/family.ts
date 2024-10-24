import { Child } from "./child";
import { Parent } from "./parent";

export interface Family {
  // Part 4 - Information About Your Parents
  father: Parent;
  mother: Parent;
  // Part 6 - Information About Your Children
  totalNumberOfChildren: string;
  children: Child[];
}

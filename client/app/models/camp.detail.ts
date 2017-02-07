/**
 * Created by Laurence Ho on 08-02-2017.
 */
import { Campground } from "./campground";
import { Comment } from "./comment";

export class CampDetail {
    campground: Campground;
    comments: Comment[];
}
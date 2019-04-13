import {EventData} from "./Event";

export interface EventMatcher {
  matches(event: EventData): boolean;
}

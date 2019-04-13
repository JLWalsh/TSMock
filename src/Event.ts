import {EventMatcher} from "./EventMatcher";
import {Action} from "./Action";

export interface EventData {
  propertyName?: string;
  args: any[];
}

export class Event {

  constructor(
    private readonly matcher: EventMatcher,
    private readonly action: Action,
  ) {}

  public matches(event: EventData) {
    return this.matcher.matches(event);
  }

  public apply() {
    return this.action.execute();
  }
}

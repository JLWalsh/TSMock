import {EventMatcher} from "../EventMatcher";
import {EventData} from "../Event";

export class ApplyEventMatcher implements EventMatcher {

  constructor(
    private readonly argsToMatch: any[],
  ) {}

  public matches({ propertyName, args }: EventData) {
    if(propertyName || args.length !== this.argsToMatch.length) {
      return false;
    }

    // TODO implement matchers like any()
    return this.argsToMatch.every((arg, index) => args[index] === arg);
  }
}

import {EventMatcher} from "../EventMatcher";
import {EventData} from "../Event";

export class ApplyOfPropertyMatcher implements EventMatcher {

  constructor(
    private readonly propertyName: string,
    private readonly args: any[],
  ) {}

  public matches({ propertyName, args }: EventData) {
    if(propertyName !== this.propertyName || args.length !== this.args.length) {
      return false;
    }

    // TODO implement matchers like any()
    return this.args.every((arg, index) => args[index] === arg);
  }
}

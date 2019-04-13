import {Event, EventData} from "./Event";
import {Action} from "./Action";

export class Events {

    public static empty() {
      return new Events([]);
    }

    private constructor(
        private readonly events: Event[] = [],
        private defaultAction: Action | void,
    ) {}

    public setDefaultAction(action: Action) {
      this.defaultAction = action;
    }

    public add(event: Event) {
        this.events.push(event);
    }

    public executeForApplyInProperty(propertyName: string, args: any[]) {
      const eventData: EventData = { args, propertyName };
      return this.handleNewEvent(eventData);
    }

    public executeForApply(args: any[]) {
      const eventData: EventData = { args };
      return this.handleNewEvent(eventData);
    }

    private handleNewEvent(eventData: EventData) {
      const event = this.events.find(event => event.matches(eventData));
      if(event) {
        return event.apply();
      }

      if(this.defaultAction) {
        return this.defaultAction.execute();
      }
    }
}

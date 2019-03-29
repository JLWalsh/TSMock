import {Event} from "./Event";

export class Events {

    constructor(
        private readonly events: Event[] = [],
    ) {}

    public add(event: Event) {
        this.events.push(event);
    }

    public executeForFunction(functionName: string, args: any[]) {
        const event = this.events.find(e => e.matchesFunction(functionName, args));
        if(!event) {
            return;
        }

        return event.execute();
    }

    public executeFor(args: any[]) {
        const event = this.events.find(e => e.matches(args));
        if(!event) {
            return;
        }

        return event.execute();
    }

}

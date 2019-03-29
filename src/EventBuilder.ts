import {Event} from "./Event";

export interface EventBuilder {
    matchArgs(args: any[]): EventBuilder;
    matchFunction(functionName: string): EventBuilder;
    build(): Event;
}

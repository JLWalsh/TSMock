import {Event} from "../Event";
import {EventBuilder} from "../EventBuilder";

export class WillResolveEventBuilder implements EventBuilder {

    public static willResolveWith(value: any) {
        return new WillResolveEventBuilder(value);
    }

    constructor(
        private readonly rejectedValue: any,
        private functionName: string | void = undefined,
        private args: any[] = []
    ) {}

    build(): Event {
        return new WillResolveEvent(this.functionName, this.args, this.rejectedValue);
    }

    matchArgs(args: any[]): EventBuilder {
        this.args = args;
        return this;
    }

    matchFunction(functionName: string): EventBuilder {
        this.functionName = functionName;
        return this;
    }
}

export class WillResolveEvent extends Event {

    constructor(functionName: string | void, args: any[], private readonly resolvedValue: any) {
        super(functionName, args);
    }

    public execute(): any {
        return new Promise(resolve => resolve(this.resolvedValue));
    }
}

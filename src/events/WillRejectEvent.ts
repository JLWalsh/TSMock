import {Event} from "../Event";
import {EventBuilder} from "../EventBuilder";

export class WillRejectEventBuilder implements EventBuilder {

    public static willRejectWith(value: any) {
        return new WillRejectEventBuilder(value);
    }

    constructor(
        private readonly rejectedValue: any,
        private functionName: string | void = undefined,
        private args: any[] = []
    ) {}

    build(): Event {
        return new WillRejectEvent(this.functionName, this.args, this.rejectedValue);
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

export class WillRejectEvent extends Event {

    constructor(functionName: string | void, args: any[], private readonly rejectedValue: any) {
        super(functionName, args);
    }

    public execute(): any {
        return new Promise((resolve, reject) => reject(this.rejectedValue));
    }
}

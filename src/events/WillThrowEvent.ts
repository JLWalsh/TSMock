import {Event} from "../Event";
import {EventBuilder} from "../EventBuilder";

export class WillThrowEventBuilder implements EventBuilder {

    public static willThrow(value: any) {
        return new WillThrowEventBuilder(value);
    }

    constructor(
        private readonly rejectedValue: any,
        private functionName: string | void = undefined,
        private args: any[] = []
    ) {}

    build(): Event {
        return new WillThrowEvent(this.functionName, this.args, this.rejectedValue);
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

export class WillThrowEvent extends Event {

    constructor(
        functionName: string | void,
        args: any[],
        private readonly thrownValue: any,
    ) {
        super(functionName, args);
    }

    execute(): any {
        throw this.thrownValue;
    }

}

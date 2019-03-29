import {Event} from "../Event";
import {EventBuilder} from "../EventBuilder";

export class WillReturnEventBuilder implements EventBuilder {

    public static willReturn(value: any) {
        return new WillReturnEventBuilder(value);
    }

    constructor(
        private readonly rejectedValue: any,
        private functionName: string | void = undefined,
        private args: any[] = []
    ) {}

    build(): Event {
        return new WillReturnEvent(this.functionName, this.args, this.rejectedValue);
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

export class WillReturnEvent extends Event {

    constructor(functionName: string | void, args: any[], private readonly returnedValue: any) {
        super(functionName, args);
    }

    public execute(): any {
        return this.returnedValue;
    }
}

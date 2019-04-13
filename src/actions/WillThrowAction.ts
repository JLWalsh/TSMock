import {Action} from "../Action";

export class WillThrowAction implements Action {

    constructor(
        private readonly thrownValue: any,
    ) {}

    execute(): any {
        throw this.thrownValue;
    }

}

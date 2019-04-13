import {Action} from "../Action";

export class WillReturnAction implements Action {

    constructor(private readonly returnedValue: any) {}

    public execute(): any {
        return this.returnedValue;
    }
}

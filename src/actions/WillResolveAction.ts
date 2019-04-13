import {Action} from "../Action";

export class WillResolveAction implements Action {

    constructor(private readonly resolvedValue: any) {}

    public execute(): any {
        return new Promise(resolve => resolve(this.resolvedValue));
    }
}

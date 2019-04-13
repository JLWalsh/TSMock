import {Action} from "../Action";

export class WillRejectAction implements Action {

    constructor(private readonly rejectedValue: any) {}

    public execute(): any {
        return new Promise((resolve, reject) => reject(this.rejectedValue));
    }
}

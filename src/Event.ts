export abstract class Event {

    protected constructor(
        private readonly functionName: string | void,
        private readonly args: any[],
    ) {}

    public matchesFunction(functionName: string, args: any[]) {
        const argsMatch = this.matches(args);

        return argsMatch && this.functionName === functionName;
    }

    public matches(args: any[]) {
        if(this.args.length !== args.length) {
            return false;
        }

        return this.args.every((arg, index) => arg === args[index]);
    }

    public abstract execute(): any;
}

import {Mock, Mockable} from "./Mock";
import {EventBuilder} from "./EventBuilder";

export class BehaviourBuilder {

    constructor(private readonly eventBuilder: EventBuilder) {}

    public given<T extends Mockable>(mock: T): T {
        const self = this;
        return new Proxy(this.generateTargetFor(mock) as T, {
           get(target: T, p: string | number | symbol, receiver: any): any {
               return (...args) => {
                   const event = self.eventBuilder.matchArgs(args).matchFunction(p as string).build();
                   Mock.addEvent(mock, event);
               }
           },
           apply(target: T, thisArg: any, argArray?: any): any {
               const event = self.eventBuilder.matchArgs(argArray).build();
               Mock.addEvent(mock, event);
           }
        });
    }

    private generateTargetFor<T extends Mockable>(mock: T) {
        if(typeof mock === 'function') {
            return () => undefined;
        }

        return {};
    }
}

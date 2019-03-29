import 'reflect-metadata';
import {Event} from "./Event";
import {Events} from "./Events";
import * as events from "events";

export type Mockable = object;
class NotAMockError extends Error {
    constructor(private readonly notMockedValue: any) {
        super("Attempted to add event on a non-mock value.");
    }
}

export class Mock {

    private static readonly EVENTS_METADATA_NAME = 'MockJS/Events';

    public static newObject<T extends Mockable>(): T {
        return this.buildProxyMockFor({} as T);
    }

    public static newFunction<T extends (...args: any) => any>(): T {
        const doNothingMockFunction = () => undefined;
        return this.buildProxyMockFor(doNothingMockFunction as T);
    }

    public static addEvent(proxyMock: any, event: Event) {
        const events = this.getEventsOf(proxyMock);
        events.add(event);
    }

    private static buildProxyMockFor<T extends object>(proxiedValue: T) {
        const proxy = new Proxy(proxiedValue as T, {
            get(target: T, p: string | number | symbol, receiver: any): any {
                const events = Mock.getEventsOf(getSelf());

                return (...args) => events.executeForFunction(p as string, args);
            },
            apply(target: T, thisArg: any, argArray?: any): any {
                const events = Mock.getEventsOf(getSelf());

                return events.executeFor(argArray);
            }
        });
        const getSelf = () => proxy;
        Reflect.defineMetadata(this.EVENTS_METADATA_NAME, new Events(), proxy);

        return proxy;
    }

    private static getEventsOf(mock: any): Events {
        const events = Reflect.getMetadata(this.EVENTS_METADATA_NAME, mock);
        if(!events) {
            throw new NotAMockError(mock);
        }

        return events;
    }
}

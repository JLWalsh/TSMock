import 'reflect-metadata';
import {Event} from "./Event";
import {Events} from "./Events";
import {Action} from "./Action";
import {WillReturnAction} from "./actions/WillReturnAction";
import {WillThrowAction} from "./actions/WillThrowAction";

export type Mockable = object;
class NotAMockError extends Error {
    constructor(private readonly notMockedValue: any) {
        super("Attempted to use value " + JSON.stringify(notMockedValue) + " as a mock.");
    }
}

export enum DefaultAction {
    RETURN_VOID,
    THROW_ERROR,
}

type DefaultActionsObject = {
    [actionName: string]: Action;
}

const defaultActions: DefaultActionsObject = {
    [DefaultAction.RETURN_VOID]: new WillReturnAction(undefined),
    [DefaultAction.THROW_ERROR]: new WillThrowAction(new Error('Not mocked.')),
};

export interface MockSettings {
    defaultAction: DefaultAction,
}

export class Mock {

    private static readonly EVENTS_METADATA_NAME = 'MockJS/Events';

    public static createNew<T extends Mockable>(settings?: MockSettings): T {
        const doNothingMockFunction = () => undefined;
        const mock = this.buildProxyMockFor(doNothingMockFunction as T);
        if(settings) {
            const action = defaultActions[settings.defaultAction];
            this.setDefaultAction(mock, action);
        }
        return mock;
    }

    public static addEvent(proxyMock: Mockable, event: Event) {
        const events = this.getEventsOf(proxyMock);
        events.add(event);
    }

    public static setDefaultAction(proxyMock: Mockable, action: Action) {
      const events = this.getEventsOf(proxyMock);
      events.setDefaultAction(action);
    }

    private static buildProxyMockFor<T extends object>(proxiedValue: T) {
        const proxy = new Proxy(proxiedValue as T, {
            get(target: T, p: string | number | symbol): any {
                const events = Mock.getEventsOf(getSelf());

                return (...args) => events.executeForApplyInProperty(p as string, args);
            },
            apply(target: T, thisArg: any, argArray?: any): any {
                const events = Mock.getEventsOf(getSelf());

                return events.executeForApply(argArray);
            }
        });
        const getSelf = () => proxy;
        Reflect.defineMetadata(this.EVENTS_METADATA_NAME, Events.empty(), proxy);

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

import {Mock, Mockable} from "./Mock";
import {Action} from "./Action";
import {ApplyOfPropertyMatcher} from "./matchers/ApplyOfPropertyMatcher";
import {Event} from "./Event";
import {ApplyEventMatcher} from "./matchers/ApplyEventMatcher";

export class BehaviourBuilder {

  public static forAction(action: Action) {
    return new BehaviourBuilder(action);
  }

  private constructor(private readonly action: Action) {}

  public given<T extends Mockable>(mock: T): T {
    const self = this;
    const target = () => undefined;

    return new Proxy(target as T, {
      get(target: T, p: string | number | symbol, receiver: any): any {
        return (...args) => {
          const matcher = new ApplyOfPropertyMatcher(p as string, args);
          const event = new Event(matcher, self.action);

          Mock.addEvent(mock, event);
        }
      },
      apply(target: T, thisArg: any, args?: any): any {
        const matcher = new ApplyEventMatcher(args);
        const event = new Event(matcher, self.action);

        Mock.addEvent(mock, event);
      }
    });
  }

  public givenUnrecognizedBehaviour<T extends Mockable>(mock: T) {
    Mock.setDefaultAction(mock, this.action);
  }
}

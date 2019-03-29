import {BehaviourBuilder} from "./BehaviourBuilder";
import {WillReturnEventBuilder} from "./events/WillReturnEvent";
import {WillThrowEventBuilder} from "./events/WillThrowEvent";
import {WillResolveEventBuilder} from "./events/WillResolveEvent";
import {WillRejectEventBuilder} from "./events/WillRejectEvent";

export function willReturn(value: any) {
  return new BehaviourBuilder(WillReturnEventBuilder.willReturn(value));
}

export function willThrow(value: any) {
  return new BehaviourBuilder(WillThrowEventBuilder.willThrow(value));
}

export function willResolve(value: any) {
  return new BehaviourBuilder(WillResolveEventBuilder.willResolveWith(value));
}

export function willReject(value: any) {
  return new BehaviourBuilder(WillRejectEventBuilder.willRejectWith(value));
}


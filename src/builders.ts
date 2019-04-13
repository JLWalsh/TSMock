import {BehaviourBuilder} from "./BehaviourBuilder";
import {WillReturnAction} from "./actions/WillReturnAction";
import {WillThrowAction} from "./actions/WillThrowAction";
import {WillResolveAction} from "./actions/WillResolveAction";
import {WillRejectAction} from "./actions/WillRejectAction";

export function willReturn(value: any) {
  return BehaviourBuilder.forAction(new WillReturnAction(value));
}

export function willThrow(value: any) {
  return BehaviourBuilder.forAction(new WillThrowAction(value));
}

export function willResolve(value: any) {
  return BehaviourBuilder.forAction(new WillResolveAction(value));
}

export function willReject(value: any) {
  return BehaviourBuilder.forAction(new WillRejectAction(value));
}


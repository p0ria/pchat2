import { Action } from './../interfaces/store.interface';
export function combineReducer<S extends Record<string, any>>(reducers: {[key in keyof(S)]: (state: any, action: Action) => any}):
  (state: S, action: Action) => S {
  return (state: S, action: Action): S => {
    const tempState:Record<string, any> = { ...state };

    Object.keys(reducers).forEach((key) => {
      tempState[key] = reducers[key](tempState[key], action);
    });

    return tempState as S;
  };
}

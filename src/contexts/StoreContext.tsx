import React, { useReducer, createContext, useEffect } from "react";
import { rootReducer } from "../state/root.reducer";
import { Store } from "../state/store";
import { Action } from "../interfaces/store.interface";

const initialState: Store = {
  login: {
    emailAddress: null,
    state: "generate"
  }
}

export const StoreContext = createContext<[Store, (action: Action) => void]>(
  [initialState, f => {}]
);

export default function StoreProvider(props: any) {
  const [store, dispatch] = useReducer(rootReducer, initialState);
  return (
    <StoreContext.Provider value={[store, dispatch]}>
      {props.children}
    </StoreContext.Provider>
  )
}

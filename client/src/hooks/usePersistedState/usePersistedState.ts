//I copied a library code, since there was a bug, that wasn't fixed yet
//https://github.com/donavon/use-persisted-state
import { useState, useEffect, useRef, useCallback } from "react";
import useEventListener from "@use-it/event-listener";

import createGlobalState from "./createGlobalState";

const usePersistedState = (
  initialState: any,
  key: string,
  { get, set }: { get: (...args: any) => any; set: (...args: any) => any }
) => {
  const globalState = useRef<any>(null);
  const [state, setState] = useState(() => get(key, initialState));

  // subscribe to `storage` change events
  useEventListener("storage", ({ key: k, newValue }: any) => {
    if (k === key) {
      const newState = JSON.parse(newValue);
      if (state !== newState) {
        setState(newState);
      }
    }
  });

  // only called on mount
  useEffect(() => {
    // register a listener that calls `setState` when another instance emits
    globalState.current = createGlobalState(key, setState, initialState);

    return () => {
      globalState.current.deregister();
    };
  }, [initialState, key]);

  const persistentSetState = useCallback(
    (newState) => {
      const newStateValue =
        typeof newState === "function" ? newState(state) : newState;

      // persist to localStorage
      set(key, newStateValue);

      setState(newStateValue);

      // inform all of the other instances in this tab
      globalState.current.emit(newState);
    },
    [state, set, key]
  );

  return [state, persistentSetState];
};

export default usePersistedState;

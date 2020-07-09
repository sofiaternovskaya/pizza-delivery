import { useState } from "react";

import usePersistedState from "./usePersistedState";
import createStorage from "./createStorage";

const createPersistedState = (key: string, provider = global.localStorage) => {
  if (provider) {
    const storage = createStorage(provider);
    return (initialState: any) => usePersistedState(initialState, key, storage);
  }
  return useState;
};

export default createPersistedState;

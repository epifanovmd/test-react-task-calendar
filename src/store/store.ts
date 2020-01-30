import { applyMiddleware, createStore, Store } from "redux";
import thunkMiddleware from "redux-thunk";
import { createMainReduce } from "./reducers/index";
import { IAppState } from "./IAppState";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(
        applyMiddleware(thunkMiddleware.withExtraArgument({})),
      )
    : applyMiddleware(thunkMiddleware.withExtraArgument({}));

const reducers = createMainReduce();

export const createSimpleStore = (initialState?: IAppState) => {
  const store: Store<IAppState, any> = createStore(
    reducers,
    initialState,
    middleware,
  );

  return store;
};

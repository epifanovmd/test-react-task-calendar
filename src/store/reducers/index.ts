import { combineReducers, Reducer } from "redux";
import { IAppState } from "../IAppState";
import { quarterReducer } from "../../modules/quarter/QuarterReducer";

export type Reducers<T> = {
  [P in keyof T]: Reducer<T[P]>;
};

export function createMainReduce(): Reducer<IAppState> {
  const _reducers: Reducers<IAppState> = {
    calendar: quarterReducer,
  };

  return combineReducers(_reducers);
}

import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { IAppState } from "../store/IAppState";
import { IEmpty } from "./IEmpty";

export type SimpleThunk = ThunkAction<
  Promise<void>,
  IAppState,
  IEmpty,
  Action
>;
export type SimpleDispatch = ThunkDispatch<
  IAppState,
  IEmpty,
  Action
>;

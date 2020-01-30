import { IQuarterState } from "../modules/quarter/IQuarterState";
import { LoadState } from "../common/loadState";

export interface IReduxData<T> {
  loadState?: LoadState;
  count?: number;
  page?: number;
  limit?: number;
  data: T;
}

export interface IAppState {
  calendar: IQuarterState;
}

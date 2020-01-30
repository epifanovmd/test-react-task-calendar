import { LoadState } from "../../common/loadState";
import { IReduxData } from "../../store/IAppState";
import { IDate } from "../../api/dto/dates";

export type EntriesDates = string | IDate[];

export interface IQuarterState {
  dates: IReduxData<EntriesDates[]>;
}

export const datesInitialState: IQuarterState = {
  dates: {
    loadState: LoadState.needLoad,
    data: [],
  },
};

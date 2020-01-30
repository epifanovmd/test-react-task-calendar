import { reducerWithInitialState } from "typescript-fsa-reducers";
import {
  datesInitialState,
  EntriesDates,
  IQuarterState,
} from "./IQuarterState";
import { QuarterActions } from "./QuarterActions";
import { newState } from "../../store/common/newState";
import { LoadState } from "../../common/loadState";
import { Success } from "typescript-fsa";
import { IEmpty } from "../../common/IEmpty";
import { IResponse } from "../../api";
import { IDate } from "../../api/dto/dates";

function getDatesStartedHandler(state: IQuarterState) {
  return newState(state, {
    dates: {
      ...state.dates,
      loadState: LoadState.refreshing,
    },
  });
}

function getDatesDoneHandler(
  state: IQuarterState,
  { result }: Success<IEmpty, IResponse<IDate[]>>,
) {
  return newState(
    state,
    newState(state, {
      dates: {
        data:
          result.data?.map(
            (item: IDate) =>
              [
                item.date,
                { date: item.date, value: true, id: item.id },
              ] as EntriesDates,
          ) || state.dates.data,
        loadState: LoadState.idle,
      },
    }),
  );
}

function getDatesFailedHandler(state: IQuarterState) {
  return newState(
    state,
    newState(state, {
      dates: {
        ...state.dates,
        loadState: LoadState.error,
      },
    }),
  );
}

export const quarterReducer = reducerWithInitialState(datesInitialState)
  .case(QuarterActions.getDates.started, getDatesStartedHandler)
  .case(QuarterActions.getDates.done, getDatesDoneHandler)
  .case(QuarterActions.getDates.failed, getDatesFailedHandler)

  // .case(QuarterActions.saveDate.started, getDatesStartedHandler)
  // .case(QuarterActions.saveDate.done, getDatesDoneHandler)
  // .case(QuarterActions.saveDate.failed, getDatesFailedHandler)
  //
  // .case(QuarterActions.deleteDates.started, getDatesStartedHandler)
  // .case(QuarterActions.deleteDates.done, getDatesDoneHandler)
  // .case(QuarterActions.deleteDates.failed, getDatesFailedHandler)
  .build();

import { actionCreator } from "../../store/common/actionCreator";
import { IDate, ISaveDate } from "../../api/dto/dates";
import { IResponse } from "../../api";

export const QuarterActions = {
  getDates: actionCreator.async<{months?: string}, IResponse<IDate[]>, Error>(
    "Dates/GET_DATES",
  ),
  saveDate: actionCreator.async<ISaveDate[], IResponse<IDate[]>, Error>(
    "Dates/SAVE_DATE",
  ),
  deleteDates: actionCreator.async<number[], IResponse<IDate[]>, Error>(
    "Dates/DELETE_DATES",
  ),
};

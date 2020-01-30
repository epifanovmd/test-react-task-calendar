import { QuarterActions } from "./QuarterActions";
import { callApi } from "../../store/common/apiActionsAsync";
import { RequestType } from "../../common/requestType";
import { ISaveDate } from "../../api/dto/dates";

export const QuarterAsyncAction = {
  getDates: (params: {months?: string}) => {
    return callApi({
      url: "dates",
      method: RequestType.GET,
      params,
      actions: QuarterActions.getDates,
    });
  },
  saveDate: (params: ISaveDate[], onSuccess: () => void) => {
    return callApi({
      url: "dates/save",
      method: RequestType.POST,
      params,
      actions: QuarterActions.saveDate,
      onSuccess,
    });
  },
  deleteDates: (params: number[], onSuccess: () => void) => {
    return callApi({
      url: "dates/delete",
      method: RequestType.POST,
      params,
      actions: QuarterActions.deleteDates,
      onSuccess,
    });
  },
};

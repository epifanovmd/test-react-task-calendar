import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../../store/IAppState";
import { Calendar } from "../../components/calendar/calendar";
import { QuarterAsyncAction } from "./QuarterAsyncAction";
import { IDate } from "../../api/dto/dates";
import { LoadState } from "../../common/loadState";

interface IProps {}

const Quarter: FC<IProps> = memo(() => {
  const dispatch = useDispatch();
  const [dateForRequest, setDateForRequest] = useState();

  useEffect(() => {
    dateForRequest &&
      dispatch(QuarterAsyncAction.getDates({ months: dateForRequest }));
  }, [dateForRequest]);

  const { data, loadState } = useSelector(
    (state: IAppState) => state.calendar.dates,
  );

  const mapDates = useMemo(() => {
    return new Map(data as [string, IDate][]);
  }, [data]);

  const onSave = useCallback(
    (values: IDate[]) => {
      const saveValues = values
        .filter((item) => !item.id && item.value)
        .map((item) => ({ date: item.date, value: item.value }));
      const deleteValues = values
        .filter((item) => !!item.id && !item.value)
        .map((item) => +item.id);
      console.log("values", values);
      console.log("saveValues", saveValues);
      console.log("deleteValues", deleteValues);
      saveValues.length > 0 &&
        dispatch(
          QuarterAsyncAction.saveDate(saveValues, () => {
            dispatch(QuarterAsyncAction.getDates({ months: dateForRequest }));
          }),
        );
      deleteValues.length > 0 &&
        dispatch(
          QuarterAsyncAction.deleteDates(deleteValues, () => {
            dispatch(QuarterAsyncAction.getDates({ months: dateForRequest }));
          }),
        );
    },
    [dispatch, data],
  );

  const onChangeShowMonths = useCallback(
    (params: string[]) => {
      setDateForRequest(params.join(","));
    },
    [dispatch],
  );
  const onGetDates = useCallback(() => {
    dispatch(QuarterAsyncAction.getDates({ months: dateForRequest }));
  }, [dispatch, dateForRequest]);

  return (
    <>
      <div className="loader" />
        <Calendar
          isRefreshing={loadState === LoadState.refreshing}
          onChangeShowMonths={onChangeShowMonths}
          onSave={onSave}
          onReset={onGetDates}
          months={3}
          dates={mapDates}
        />
    </>
  );
});

export default Quarter;

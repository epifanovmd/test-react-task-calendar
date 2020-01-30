import React, { FC, memo, useCallback } from "react";
import { DateTime } from "luxon";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { IDate } from "../../api/dto/dates";

interface IProps {
  currentDate: DateTime;
  dates: Map<string, IDate>;
  onClick: (data: IDate) => void;
}

export const DatePicker: FC<IProps> = memo(({
  currentDate,
  dates,
  onClick,
}): JSX.Element => {
  const weeks = ["M", "T", "W", "T", "F", "S", "S"];
  const date = currentDate;
  const startOfMonth = date.startOf("month");
  const startWeekOfMonth = startOfMonth.weekday;
  const daysOfMonth = date.daysInMonth;
  const daysInMonth = Array(daysOfMonth - 1)
    .fill(null)
    .map(({}, index) => startOfMonth.plus({ days: index + 1 }));

  const onClickDay = useCallback(
    (clickDate: string, value: boolean, id) => () => {
      onClick({ date: clickDate, value, id });
    },
    [onClick],
  );

  return (
    <div className={styles.container}><div className={styles.date}>{date.toFormat("LLL yyyy")}</div>
      <div className={styles.week_container}>
        {weeks.map((item) => (
          <span key={item + Math.random()} className={styles.week}>
            {item}
          </span>
        ))}
      </div>
      <div className={styles.days}>
        <div
          style={{ gridColumn: startWeekOfMonth }}
          className={classNames(styles.day, {
            [styles.day_off]: !!dates.get(date.startOf("month").toFormat("yyyy-LL-dd"))?.value,
          })}
          onClick={onClickDay(
            date.startOf("month").toFormat("yyyy-LL-dd"),
            !dates.get(date.startOf("month").toFormat("yyyy-LL-dd"))?.value,
            dates.get(date.startOf("month").toFormat("yyyy-LL-dd"))?.id || "",
          )}
        >
          {date.startOf("month").day}
        </div>
        {daysInMonth.map((item) => (
          <div
            key={item.day}
            className={classNames(styles.day, {
              [styles.day_off]: !!dates.get(item.toFormat("yyyy-LL-dd"))?.value,
            })}
            onClick={onClickDay(
              item.toFormat("yyyy-LL-dd"),
              !dates.get(item.toFormat("yyyy-LL-dd"))?.value,
              dates.get(item.toFormat("yyyy-LL-dd"))?.id || "",
            )}
          >
            {item.day}
          </div>
        ))}
      </div>
    </div>
  );
});

import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { DatePicker } from "../datePicker/datePicker";
import { DateTime } from "luxon";
import styles from "./styles.module.scss";
import { IDate } from "../../api/dto/dates";

interface IProps {
  months?: number;
  dates: Map<string, IDate>;
  onSave: (values: IDate[]) => void;
  onReset: () => void;
  onChangeShowMonths: (dates: string[]) => void;
  isRefreshing: boolean;
}

export const Calendar: FC<IProps> = memo(
  ({
    months = 1,
    dates: defaultDates,
    onSave,
    onReset,
    onChangeShowMonths,
    isRefreshing,
  }): JSX.Element => {
    const [date, setDate] = useState(DateTime.local());
    const [dates, setDates] = useState(defaultDates);
    const [newDates, setNewDates] = useState(new Map<string, IDate>());

    useEffect(() => {
      onChangeShowMonths([
        date.toFormat("yyyy-LL"),
        date.plus({ month: 1 }).toFormat("yyyy-LL"),
        date.plus({ month: 2 }).toFormat("yyyy-LL"),
      ]);
    }, [date]);

    useEffect(() => {
      setDates(defaultDates);
      setNewDates(new Map<string, IDate>());
    }, [defaultDates]);

    const onLeft = useCallback(() => {
      setDate(date.minus({ month: months }));
    }, [date, months]);

    const onRight = useCallback(() => {
      setDate(date.plus({ month: months }));
    }, [date, months]);

    const onClickDay = useCallback(
      (data: IDate) => {
        setNewDates(new Map(newDates.set(data.date, data)));
        if (dates.has(data.date)) {
          dates.delete(data.date);
          setDates(new Map(dates));
        } else {
          setDates(new Map(dates.set(data.date, data)));
        }
      },
      [dates, defaultDates],
    );

    const getDatePickers = (count: number) => {
      const datePickers = [];

      for (let i = 0; i < count; i++) {
        datePickers.push(
          <DatePicker
            key={i}
            onClick={onClickDay}
            dates={dates}
            currentDate={date.plus({ month: i })}
          />,
        );
      }

      return datePickers;
    };

    const onSaveHandler = useCallback(() => {
      const values: IDate[] = [];
      newDates.forEach((item) => values.push(item));
      console.log(values);
      onSave(values);
    }, [newDates]);

    return (
      <div className={styles.calendar_container}>
        <div className={styles.calendar}>
          {
            <div
              style={isRefreshing ? { opacity: 1 } : { opacity: 0, zIndex: -1 }}
              className={styles.refreshing}
            >
              <div className={styles.loader} />
            </div>
          }

          <div className={styles.left} onClick={onLeft}>
            {"<"}
          </div>

          {getDatePickers(months)}

          <div className={styles.right} onClick={onRight}>
            {">"}
          </div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.buttons_reset} onClick={onReset}>
            Reset
          </div>
          <div className={styles.buttons_save} onClick={onSaveHandler}>
            Save
          </div>
        </div>
      </div>
    );
  },
);

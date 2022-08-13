import { useEffect, useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import '../../styles/calendar.css';
import { daysInMonth, firstDayOfMonth, months } from '../../utils/date';

interface MonthSelectorProps {
  monthIndex: number;
  handleSelectMonth: (month: number) => void;
}
const MonthSelector = ({
  monthIndex,
  handleSelectMonth,
}: MonthSelectorProps) => {
  return (
    <div className="month-selector">
      {months.map((month, i) => {
        return (
          <span
            onClick={() => handleSelectMonth(i)}
            key={month}
            className={`selectable-month ${
              i === monthIndex ? 'selected-month' : ''
            }`}
          >
            {month}
          </span>
        );
      })}
    </div>
  );
};

interface HeaderProps {
  month: number;
  year: number;
  setMonth: Function;
  monthHandler: () => void;
}
const Header = ({ month, year, monthHandler, setMonth }: HeaderProps) => {
  const handleDecreaseMonth = () => {
    setMonth(Math.abs((month + 12 - 1) % 12));
  };
  const handleIncreaseMonth = () => {
    setMonth(Math.abs((month + 1) % 12));
  };
  return (
    <div className="header">
      <div className="header--info" onClick={monthHandler}>
        <span className="header--month">{months[month]}, </span>
        <span className="header--year">{year}</span>
      </div>
      <div className="header-icons">
        <span onClick={handleDecreaseMonth}>
          <GoChevronLeft fontSize="1.7rem" />
        </span>
        <span onClick={handleIncreaseMonth}>
          <GoChevronRight fontSize="1.7rem" />
        </span>
      </div>
    </div>
  );
};

const WeekDays = () => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <div className="weekrow">
      {weekdays.map((weekday) => {
        return (
          <span key={weekday} className="weekday">
            {weekday}
          </span>
        );
      })}
    </div>
  );
};

interface DaysOfMonthProps {
  days: number;
  month: number;
  selectedDay: Date;
  handleSelectDay: (day: Date) => void;
}

const DaysOfMonth = ({
  days: daysNumber,
  month,
  selectedDay,
  handleSelectDay,
}: DaysOfMonthProps) => {
  const days = Array.from({ length: daysNumber }, (_, v) => v + 1);
  const dayToBeginTheMonthFrom = firstDayOfMonth(month);
  const style = { gridColumnStart: dayToBeginTheMonthFrom + 1 };

  const handleFormatDay = (day: number) => {
    const now = new Date();
    now.setDate(day);
    now.setMonth(month);
    return now;
  };

  return (
    <>
      {days.map((day, i) => {
        const date = handleFormatDay(day);
        return (
          <span
            onClick={() => handleSelectDay(handleFormatDay(day))}
            key={i}
            className={`day ${i === 0 ? 'first-day' : ''}
                ${
                  date.getDate() === selectedDay.getDate() &&
                  date.getMonth() === selectedDay.getMonth()
                    ? 'selected-day'
                    : ''
                }
                ${
                  (i + dayToBeginTheMonthFrom) % 7 === 0 ||
                  (i + dayToBeginTheMonthFrom) % 7 === 6
                    ? 'holiday'
                    : ''
                }
                `}
            style={i === 0 ? style : {}}
          >
            {day}
          </span>
        );
      })}
    </>
  );
};

interface IProps {
  setDay: (date: Date) => void;
  dateData?: Date;
  day?: string;
}

const Calendar = ({ setDay, dateData, day }: IProps) => {
  const todayDate = new Date();
  const [selectedDay, setSelectedDay] = useState<Date>(
    (day && new Date(day)) || new Date()
  );
  const [month, setMonth] = useState(todayDate.getMonth());
  const [now, setNow] = useState(todayDate);
  const [displayMonthSelector, setDisplayMonthSelector] = useState(false);
  const days = daysInMonth(month);

  const monthHandler = () => {
    setDisplayMonthSelector(!displayMonthSelector);
  };

  const handleSetMonth = (newMonth: number) => {
    const newNow = new Date(now);
    newNow.setMonth(newMonth);
    setMonth(newMonth);
    setNow(newNow);
  };

  const handleSelectMonth = (month: number) => {
    setDisplayMonthSelector(!displayMonthSelector);
    handleSetMonth(month);
  };

  const handleSelectDay = (day: Date) => {
    setDay(day);
    setSelectedDay(day);
  };

  useEffect(() => {
    if (dateData) setSelectedDay(dateData);
  }, [dateData]);

  useEffect(() => {
    if (day) {
      let selectedDay = new Date(day);
      setSelectedDay(selectedDay);
      setMonth(selectedDay.getMonth());
    }
  }, [day]);
  return (
    <>
      <Header
        month={month}
        year={now.getFullYear()}
        setMonth={setMonth}
        monthHandler={monthHandler}
      />
      <div className="calendar">
        <WeekDays />
        <DaysOfMonth
          handleSelectDay={handleSelectDay}
          days={days}
          month={month}
          selectedDay={selectedDay}
        />
        {displayMonthSelector && (
          <MonthSelector
            monthIndex={month}
            handleSelectMonth={handleSelectMonth}
          />
        )}
      </div>
    </>
  );
};

export default Calendar;

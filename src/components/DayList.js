import React from "react";
import DayListItem from "components/DayListItem";
import classNames from "classnames";

export default function DayList(props) {
  const { days, value, onChange } = props;

  const parsedDays = days.map(eachDay => <DayListItem key={eachDay.id} {...eachDay} selected={eachDay.name === value} setDay={onChange} />);
  return (
    <ul>
      {parsedDays}
    </ul>
  );
}

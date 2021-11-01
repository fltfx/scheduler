import React from "react";
import DayListItem from "components/DayListItem";
import classNames from "classnames";

export default function DayList(props) {
  const { days, value, onChange } = props;
  console.log(days);
  const parsedDays = days.map(eachDay => <DayListItem key={eachDay.id} {...eachDay} selected={eachDay.name === value} setDay={onChange} />);
  return (
    <ul>
      {parsedDays}
    </ul>
  );
}


/* <DayListItem 
key={props.days[0].id}
name={props.days[0].name} 
spots={props.days[0].spots} 
selected={props.days[0].name === props.day}
setDay={props.setDay}  
/> */
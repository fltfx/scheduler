import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import classNames from "classnames";


export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;
  // const interviewerClass = classNames("interviewers__item", {
  //   "interviewers__item--selected": selected
  // });
  console.log("value", value);

  const parsedInterviewers = interviewers.map(eachInterviewer => 
  <InterviewerListItem 
  key={eachInterviewer.id} 
  {...eachInterviewer} 
  selected={eachInterviewer.id === value} 
  setInterviewer={() => onChange(eachInterviewer.id)} 
  />
  );


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  );
}
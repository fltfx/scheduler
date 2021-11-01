
import React, { Fragment } from 'react'

//import "components/Appointment/styles.scss";
import classNames from "classnames";
import { useState } from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  //const [day, setDay] = useState("Monday");
  function otherComponent(props) { 
    // CORRECT: Ternary is allowed. One of the two h1s will be rendered
    console.log(props.interview);
      return (props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty/>);
    }
  return (
    <Fragment>
      <article className="appointment">
        <section>
          <Header time={props.time} />
          {otherComponent(props)}
        </section>
      </article>
    </Fragment>
  );
}

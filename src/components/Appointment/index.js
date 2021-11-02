
import React, { Fragment } from 'react'

//import "components/Appointment/styles.scss";
import classNames from "classnames";
import { useState } from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import "components/Appointment/styles.scss";
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  //const [day, setDay] = useState("Monday");
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log(props.interview, mode);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log(props.id, interview);
    transition(SAVING);
    // props.bookInterview(props.id, interview);
    // transition(SHOW);

    const myPromise = props.bookInterview(props.id, interview);
    myPromise.then(() => transition(SHOW));
  }

  function onDelete(name, interviewer) {
    const interview = null;
    transition(DELETING);
    const myPromise = props.cancelInterview(props.id, interview);
    myPromise
      .then(() => transition(EMPTY));
  }
  console.log(props);
  return (
    <Fragment>
      <article className="appointment">
        <section>
          <Header time={props.time} />
          {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
          {mode === SHOW && (
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer}
              onDelete = {() => transition(CONFIRM)}
              onEdit = {() => transition(EDIT)}
            />
          )}
          {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
          {mode === EDIT && <Form interviewers={props.interviewers} student={props.interview.student} interviewer={props.interview.interviewer} onCancel={back} onSave={save}/>}
          {mode === SAVING && <Status message={"saving right now"}/>}
          {mode === DELETING && <Status message={"deleting right now"}/>}
          {mode === CONFIRM && <Confirm message={"Are you sure you want to delete?"} onCancel={() => transition(SHOW)} onConfirm={onDelete}/>}
        </section>
      </article>
    </Fragment>
  );
}

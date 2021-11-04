
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
import Error from './Error';
import "components/Appointment/styles.scss";
import useVisualMode from 'hooks/useVisualMode';
import { transform } from '@babel/core';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    const myPromise = props.bookInterview(props.id, interview);
    myPromise
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function onDelete(name, interviewer) {
    transition(DELETING, true);
    const myPromise = props.cancelInterview(props.id);
    myPromise
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }
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
          {mode === EDIT && <Form interviewers={props.interviewers} student={props.interview.student} interviewer={props.interview.interviewer.id} onCancel={back} onSave={save}/>}
          {mode === SAVING && <Status message={"saving right now"}/>}
          {mode === DELETING && <Status message={"deleting right now"}/>}
          {mode === CONFIRM && <Confirm message={"Are you sure you want to delete?"} onCancel={() => transition(SHOW)} onConfirm={onDelete}/>}
          {mode === ERROR_SAVE && <Error message={"There was an error saving."} onClose={back}/>}
          {mode === ERROR_DELETE && <Error message={"There was an error deleting."} onClose={back}/>}
        </section>
      </article>
    </Fragment>
  );
}

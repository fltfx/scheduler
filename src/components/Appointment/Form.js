import React from "react";

import classNames from "classnames";
import { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const { interviewers, onSave, onCancel } = props;
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer("");
  }
  const cancel = () => {
    reset();
    onCancel();
  }

  function validate(name, interviewer) {
    //validate if student name has been entered
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    //validate if interviewer has been selected
    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={(event) => setStudent(event.target.value)}
        data-testid="student-name-input"

      />
      <section className="appointment__validation">{error}</section>
    </form>
    <InterviewerList 
      interviewers={interviewers}
      value={interviewer} 
      onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={() => validate(student,interviewer)}>Save</Button>
    </section>
  </section>
</main>
  );
}

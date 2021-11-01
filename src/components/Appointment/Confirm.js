import React from "react";

import classNames from "classnames";
import { useState } from "react";
import Button from "components/Button";

export default function Confirm(props) {
  const { message, onConfirm, onCancel } = props;
  //const [day, setDay] = useState("Monday");

  return (
<main className="appointment__card appointment__card--confirm">
  <h1 className="text--semi-bold">{message}</h1>
  <section className="appointment__actions">
    <Button danger onClick={onCancel}>Cancel</Button>
    <Button danger onClick={onConfirm}>Confirm</Button>
  </section>
</main>

  );
}

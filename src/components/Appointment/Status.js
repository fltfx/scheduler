import React from "react";

import classNames from "classnames";
import { useState } from "react";

export default function Status(props) {
  const { message } = props;
  //const [day, setDay] = useState("Monday");

  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{message}</h1>
    </main>

  );
}

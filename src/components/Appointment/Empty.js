
import React from "react";

import classNames from "classnames";
import { useState } from "react";

export default function Empty(props) {
  const { onAdd } = props;
  //const [day, setDay] = useState("Monday");

  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={onAdd}

      />
    </main>
  );
}

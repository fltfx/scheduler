import { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); // This line is new!

  function transition(newMode, replace = false) {
    console.log(history);
    if (replace === true) {
      console.log("lastone:",history[history.length - 1]);
      history[history.length - 1] = newMode;
      console.log(newMode);
      console.log(history);
    } else {
      history.push(newMode);
    }
    setMode(newMode);
  }

  function back() {
    console.log("line21:",history);
    history.pop();
    console.log("line23:",history);
    if (history.length >= 1){
      const prevMode = history[history.length - 1];
      setMode(prevMode);
    }
  }

  return { mode, transition, back };
}
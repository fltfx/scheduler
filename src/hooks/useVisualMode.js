import { useState, useEffect } from "react";

export default function useVisualMode(initial) {


  const [history, setHistory] = useState([initial]); // This line is new!

  function transition(mode, replace = false) {
    console.log(history);
    if (replace === true) {
      setHistory(prev => [...prev.slice(0, prev.length-1), mode]);
    } else {
      setHistory(prev => [...prev, mode]);
    }
  }

  function back() {
    if (history.length < 2){
      return;
    }
    setHistory(prev => [...prev.slice(0, history.length-1)])
  }

  return { mode: history[history.length-1], transition, back };
}

// myArray = [1,2,3,4,5];
// myArray.slice(0,2); //==[1,2]
// myArray.slice(0,myArray.length -1); //=== [1,2,3,4]
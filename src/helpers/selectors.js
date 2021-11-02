export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDay = state.days.filter(days => days.name === day);
  if (state.days.length === 0) {
    return [];
  }
  if (filteredDay.length === 0) {
    return [];
  }
  //console.log(filteredDay[0].appointments);
  //appointments array is: filteredDay.appointments
  const filteredAppts = [];

  for (let eachApt of filteredDay[0].appointments) {
    //console.log(state["appointments"][eachApt.toString()]);
    filteredAppts.push(state["appointments"][eachApt.toString()]);
  }
  //console.log(filteredAppts);
  return filteredAppts;
}

export function getInterview(state, interview) {  
  if (!interview) {
    return null;
  }
  
  console.log("state.interviewers:",state.interviewers);
  //const filteredInt = state.interviewers.filter(eachInterviewer => eachInterviewer.id === interview.interviewer);
  const intID = interview.interviewer;
  console.log("intID test:",intID);
  const filteredInt = state.interviewers[intID];
  console.log("filteredInt", filteredInt);

  // if (filteredDay.length === 0) {
  //   return [];
  // }
  //console.log(filteredDay[0].appointments);
  //appointments array is: filteredDay.appointments
  let returnObj = {
    "student": interview.student,
    "interviewer": filteredInt
  };

  // for (let eachApt of filteredDay[0].appointments) {
  //   //console.log(state["appointments"][eachApt.toString()]);
  //   filteredAppts.push(state["appointments"][eachApt.toString()]);
  // }
  console.log("returnObj:", returnObj);
  return returnObj;
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(days => days.name === day);
  if (state.days.length === 0) {
    return [];
  }
  if (filteredDay.length === 0) {
    return [];
  }

  let filteredInts = [];

  for (let eachInt of filteredDay[0].interviewers) {
    //console.log(state["appointments"][eachApt.toString()]);
    filteredInts.push(state["interviewers"][eachInt.toString()]);
  }
  //console.log(filteredAppts);
  //return filteredAppts;
  console.log(filteredInts);
  return filteredInts;
}


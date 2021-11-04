export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDay = state.days.filter(days => days.name === day);
  if (state.days.length === 0) {
    return [];
  }
  if (filteredDay.length === 0) {
    return [];
  }

  const filteredAppts = [];

  for (let eachApt of filteredDay[0].appointments) {

    filteredAppts.push(state["appointments"][eachApt.toString()]);
  }

  return filteredAppts;
}

export function getInterview(state, interview) {  
  if (!interview) {
    return null;
  }
  

  const intID = interview.interviewer;

  const filteredInt = state.interviewers[intID];

  let returnObj = {
    "student": interview.student,
    "interviewer": filteredInt
  };
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
    filteredInts.push(state["interviewers"][eachInt.toString()]);
  }

  return filteredInts;
}


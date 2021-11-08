import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
   
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);

  const setDay = day => setState({ ...state, day });

  //bookInterview
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(interview);
    return axios.put(`/api/appointments/${id}`, {interview})   
      .then((response) => updateSpots(state, appointments, id))
      .then((response) => {
        //response = the returned days array from updateSpots
        setState({
          ...state,
          appointments,
          days: response
        });
      });
    }


  //cancelInterview
  function cancelInterview(id) {
    console.log(id);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(appointments);
    return axios.delete(`/api/appointments/${id}`)
      .then((response) => updateSpots(state, appointments, id))    
      .then((response) => {
        //response = the returned days array from updateSpots
        setState({
          ...state,
          appointments,
          days: response
        });
      });
  }

  function updateSpots(state, appointments, id) {
    const dayIndex = state.days.findIndex(day => day.name === state.day);
    const day = state.days[dayIndex];
    let spots = 0;

    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    const newDay = {...day, spots};
    const newDays = state.days.map(d => d.name === state.day ? newDay : d);
    return newDays;
  }

  return { state, setDay, bookInterview, cancelInterview };
}


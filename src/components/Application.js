
import React from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import classNames from "classnames";
import { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });
  //Add the line below:
  let dailyAppointments = [];

  const setDay = day => setState({ ...state, day });
  //const setDays = days => setState(prev => ({ ...prev, days }));

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
    setState({
      ...state,
      appointments
    });
    console.log(interview);
    return axios.put(`/api/appointments/${id}`, {interview})
        .then(response => setState({
          ...state,
          appointments
        }
        ))
        .catch(error => {
            //this.setState({ errorMessage: error.message });
            console.error('There was an error!', error);
        });
  }


  //cancelInterview
  function cancelInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    console.log(appointments);
    return axios.delete(`/api/appointments/${id}`)
        .then(response => setState({
          ...state,
          appointments
        }
        ))
        .catch(error => {
            //this.setState({ errorMessage: error.message });
            console.error('There was an error!', error);
        });
  }

  useEffect(() => {
    //axios.get("/api/days").then(response => setDays(response.data));
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // set your states here with the correct values...
      console.log("all:",all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);

  dailyAppointments = getAppointmentsForDay(state, state.day);
  //console.log("dailyApt", dailyAppointments);
  const schedule = dailyAppointments.map(eachApt => {
    const interview = getInterview(state, eachApt.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      <Appointment key={eachApt.id} {...eachApt} interview={interview} interviewers={interviewers} bookInterview={bookInterview} cancelInterview={cancelInterview}/>
    );
  });
  console.log("state.interviewers:",state.interviewers);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

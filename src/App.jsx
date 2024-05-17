import { useState, useEffect } from 'react'
import EventsBoardPage from './components/EventsBoardPage';
import EventRegistrationPage from './components/EventRegistrationPage';
import EventParticipantsPage from './components/EventParticipantsPage';
import './App.css'
import {
  BrowserRouter as Router, Routes, Route, Link
} from "react-router-dom";

function App() {
  const [events, setEvents] = useState([]);
  const getEvents = async() =>{
    await fetch('https://test-events-iota.vercel.app/api/events')
      .then(response => response.json())
      .then(jsonData => setEvents(jsonData))
      .catch(err => console.log(err));  
  } 
  useEffect(() => {
      getEvents()
  },[]);
  
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<EventsBoardPage events = {events}/>}/>
          {
            events.map((item, index) => (
              <Route key={index} exact path={`/event/${item.event_id}`} element={<EventParticipantsPage event = {item}/>}/>
            ))
          }
          {
            events.map((item, index) => (
              <Route key={index} exact path={`/event/${item.event_id}/registration/`} element={<EventRegistrationPage event_id = {item.event_id}/>}/>
            ))
          }
        </Routes>
      </Router>
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import EventBlock from './EventBlock';

function EventsBoardPage({events}) {
  const [sortType, setSortType] = useState('title');
  const [events_list, setEvents] = useState([]);
 

  function compareByTitle(a, b) {
    return a["event_name"].localeCompare(b["event_name"]);
  }
  function compareByOrganizer(a, b) {
    return a["organizer"].localeCompare(b["organizer"]);
  }
  function compareByDate(a, b){
    return new Date(a["event_date"]) - new Date(b["event_date"]);
  }

  const scrollHandler = (e) => {
    console.log(e)
  }
  
  useEffect(() => {

    const sortArray = type => {
      const types = {
        title: 'title',
        organizer: 'organizer',
        date: 'date',
      };
      const sortProperty = types[type];
      if (sortProperty === "title" || !sortProperty) setEvents([...events].sort(compareByTitle))
      if (sortProperty === "organizer") setEvents([...events].sort(compareByOrganizer))
      if (sortProperty === "date") setEvents([...events].sort(compareByDate))
    };

    sortArray(sortType);


  }, [events, sortType]); 

  useEffect(() => {

    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  },[])

  return (
    <>
      <div className='w-[1200px] mx-auto'>
        <h1 className="text-3xl pt-10 pb-10">Events</h1>   

        <label htmlFor="sort">Sort by: </label>
        <select className='mb-5' onChange={e => setSortType(e.target.value)}>
          <option value="title">Title</option>
          <option value="organizer">Organizer</option>
          <option value="date">Date</option>
        </select>

        <div className='w-[1200px] m-0 grid gap-x-8 gap-y-4 grid-cols-4'>
          <EventBlock events_list = {events_list}/>
        </div>
      </div>
    </>
  )
}

export default EventsBoardPage

import { useState, useEffect } from "react"
import BarChart from "./Chart";

function EventParticipantsPage({event}) {

    const [registrations, setRegistrations] = useState([]);
    const [registrationsList, setRegistrationsList] = useState([]);

    const [findBy, setFindBy] = useState('');

    const getRegistrations = async() =>{
      await fetch(`https://test-events-iota.vercel.app/api/registered_users_for_event/${event.event_id}`)
        .then(response => response.json())
        .then(jsonData => setRegistrations(jsonData))
        .catch(err => console.log(err));
    } 
    
    const findItems = (searchString) => {
        return registrations.filter((item) => 
            item["users_name"].includes(searchString) || item["email"].includes(searchString)
        );
    }

    useEffect(() => {
        getRegistrations()

        if (!findBy) {
            setRegistrationsList([...registrations]);
        }
        else {
            setRegistrationsList(findItems(findBy))
        }
    },[registrations.length, findBy]);  
    return (
        <div className='w-[1200px] mx-auto'>
            <h1 className="text-3xl pt-10 pb-10">"{event.event_name}" participants</h1>
            <label htmlFor="finder">Find by Name or email: </label>
            <input type="text" name="finder" onChange={e => setFindBy(e.target.value)} className='h-7 w-64 border-[1px] mb-5 border-solid border-amber-900'/>
            <div className=''>
                <div className='w-[1200px] m-0 grid gap-x-8 gap-y-4 grid-cols-4'>
                    {registrationsList.map((item, index)=> (
                        <div key={index} className="  h-[100px] text-left  pt-5 pl-5 border-2 border-solid border-amber-900">
                            <h3 className="text-xl">{item.users_name}</h3>
                            <h4 className="text-sm mt-2">{item.email}</h4>
                        </div>
                    ))}
                </div>
            </div>
            <BarChart registrations = {registrations}/>
        </div>
    )
  }
  
  export default EventParticipantsPage
  
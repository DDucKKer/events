
function EventBlock({events_list}) {
    function convertDate(str) {
        const data = new Date(str);
        return data.getDate() + '/' +
            (data.getMonth() + 1) + '/' +
            data.getFullYear()
    }
  return (
    <>
        {events_list.map((event, index) => (
            <div key={index} className="text-left pt-3 pl-5 border-2 border-solid border-amber-900">
                <h2 className="text-xl pb-2">{event.event_name}</h2>
                <h3 className="text-sm pb-1">{event.description}</h3>
                <h3 className="text-sm pb-1">{convertDate(event.event_date)}</h3>
                <h3 className="text-sm pb-1">{event.organizer}</h3>
                <div className='m-0 flex justify-between pb-3'>
                    <a href={`/event/${event.event_id}/registration`} className="text-blue-400">Register</a>
                    <a href={`/event/${event.event_id}`} className="text-blue-400 pr-10 ">View</a>
                </div>
            </div>
        ))}
    </>
  )
}

export default EventBlock

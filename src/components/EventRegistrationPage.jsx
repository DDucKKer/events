import { useState, useEffect } from 'react'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";



function EventRegistrationPage({event_id}) {

    const [users_name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birth_date, setBDate] = useState('');
    const [where_hear, setWhereHear] = useState('Social media');
    let navigate = useNavigate();
    const onSubmitForm = async() => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) return toast.error("Incorrectly entered email address!")
        try {
            const body = { users_name, email, birth_date, where_hear, event_id };
        alert("You have successfully registered for the event!")
        navigate(-1)    
            const response = await fetch("https://test-events-iota.vercel.app/api/registrations", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });
        } catch (err) {
            console.log(err)
        }
    }





    return (
        <div className='w-[500px] pt-10 mx-auto'>
            <div className='border-2 border-solid border-amber-900 p-5'>
                <p className='text-xl pt-4 pb-1'>Full name</p>
                <input type="text" 
                    className='h-8 w-64 border-[1px] border-solid border-amber-900'
                    onChange={e => setName(e.target.value)}
                />
                <p className='text-xl pt-4 pb-1'>Email</p>
                <input type="text"  
                    className='h-8 w-64 border-[1px] border-solid border-amber-900'
                    onChange={e => setEmail(e.target.value)}
                />
                <p className='text-xl pt-4 pb-1'>Date of birth</p>
                <input type="date"  
                    className='h-8 w-64 border-[1px] border-solid border-amber-900'
                    onChange={e => setBDate(e.target.value)}
                />
                <div className='text-xl pt-4 pb-1'>
                    <input id="option1" type="radio" 
                        checked={where_hear === "Social media"} 
                        onChange={() => setWhereHear("Social media")}
                    />
                    <label className='mr-4' htmlFor="option1">Social media</label>

                    <input id="option1" type="radio" 
                        checked={where_hear === "Friends"} 
                        onChange={() => setWhereHear("Friends")}
                    />
                    <label className='mr-4' htmlFor="option1">Friends</label>
                    <input id="option1" type="radio" 
                        checked={where_hear === "Found myself"} 
                        onChange={() => setWhereHear("Found myself")}
                    />
                    <label htmlFor="option1">Found myself</label>
                </div>

                <button className='mt-2 px-5 py-2  bg-slate-600 text-white' onClick={onSubmitForm}>Registrate</button>
            </div>
        </div>
    )
}

export default EventRegistrationPage

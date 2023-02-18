
import React, { useState, useEffect } from 'react';
import eventService from '../../utils/eventService';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetailPage.css'

export default function DetailPage(props) {
  const [event, setEvent] = useState({});

  const {id} = useParams()
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
    const data = await eventService.show(id);
    setEvent(data);
    };
    fetchData();
  }, [id]);



  const handleDelete = async () => {
    await eventService.delete(id);
    const data = await eventService.list();
    props.updateEventListState(data)
    console.log('navigate events route')
    navigate("/events");

    
  }

  const handleUpdate = async () =>{
    console.log('update')
    navigate(`/events/${event._id}/update`);
    
  }

  return (
    <>

        <div >
          <div className='info' >

            <h3>NAME: {event.name}</h3>
            <p>DESCRIPTION: {event.description}</p>
            <p>DATE: {event.date}</p>
            <p>EVENT TYPE: {event.type}</p>

          </div>
          <button className='btn-delete' onClick={handleDelete}>DELETE</button>
          <button className='btn-edit' onClick={handleUpdate}>EDIT</button>
        </div>
    
    </>
  );
}
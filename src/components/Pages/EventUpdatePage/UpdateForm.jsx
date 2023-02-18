import React, { Component, useCallback, useEffect, useState } from 'react';
import { Link, redirect, Navigate } from 'react-router-dom';
import eventService from '../../../utils/eventService';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './UpdateForm.css'


const UpdatePageForm = () => {
  const [event, setEvent] = useState({
    name: "",
    description: "",
    date: "",
    type: "",
  });
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`useEffect called`);
    const fetchEvent = async () => {
        const rec = await eventService.show(id);
        setEvent(rec);
    }
    fetchEvent();
  }, [])

  const handleChange = useCallback((e) => {
    console.log(`handleChange name = ${e.target.name}, value = ${e.target.value}`);
    let newEvent = {
        ...event,
    };
    newEvent[e.target.name] = e.target.value;
    console.log(`handleChange newEvent = ${JSON.stringify(newEvent)}`);
    setEvent(newEvent);
  }, [event, setEvent]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const data = await eventService.update(id, event);
    navigate(`/events/${id}`);

    } catch (err) {
    }
  }

  const isFormInvalid = useCallback(() => {
    return !(event.name && event.description && event.date && event.type);
  }, [event]);

  return (
    <div>
        <header className="header-footer">Edit Event</header>


        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit= {async (e) => await handleSave(e)}>
            <div>
                <TextField
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={event.name}
                    name="name"
                    onChange={handleChange}
                    // defaultValue="Name"
                />
                <TextField
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    value={event.description}
                    name="description"
                    onChange={handleChange}
                    defaultValue="description"
                />
                <TextField
                    type="date"
                    className="form-control"
                    placeholder="Date"
                    value={event.date}
                    name="date"
                    onChange={handleChange}
                    defaultValue="date"
                />
                <TextField
                    type="text"
                    className="form-control"
                    placeholder="Type"
                    value={event.type}
                    name="type"
                    onChange={handleChange}

                />


                <button className="edit-btn" disabled={isFormInvalid()}>Submit</button>
                <Link to='/'>Cancel</Link>
            </div>
        </Box>
    </div>
  );

}

export default UpdatePageForm
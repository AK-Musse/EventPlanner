import React, { Component } from 'react';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import eventService from '../../utils/eventService';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './CreateForm.css'

class CreateForm extends Component {
    constructor(props){
        super(props)

        this.state = {
          name: '',
          description: '',
          date: '',
          type: '',
          submitted: false,
        };
    }



    handleChange = (e) => {
        this.props.updateMessage('');
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await eventService.create(this.state);
            this.props.updateEventListState(data)
            this.setState({
                id: data._id,
                submitted: true,
            })
        } catch (err) {
            this.props.updateMessage(err.message);
        }
    }

    isFormInvalid() {
        return !(this.state.name && this.state.description && this.state.date && this.state.type );
    }

    render() {
        return (
            <div>
                {this.state.submitted && <Navigate to={`/events/${this.state.id}`} />}
                <header className="header-footer">Add Event</header>
    
    
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                       onSubmit= {this.handleSubmit}>
                        <div>
                            <TextField
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={this.state.name}
                                name="name"
                                onChange={this.handleChange}
                                defaultValue="Name"
                            />
                            <TextField
                                type="text"
                                className="form-control"
                                placeholder="Description"
                                value={this.state.description}
                                name="description"
                                onChange={this.handleChange}
                                defaultValue="description"
                            />
                            <TextField
                                type="date"
                                className="form-control"
                                placeholder="Date"
                                value={this.state.date}
                                name="date"
                                onChange={this.handleChange}
                                defaultValue="date"
                            />
                            <TextField
                                type="text"
                                className="form-control"
                                placeholder="Type"
                                value={this.state.type}
                                name="type"
                                onChange={this.handleChange}
    
                            />
                            
    
                            <button className="create-btn" disabled={this.isFormInvalid()}>Submit</button>&nbsp;&nbsp;
                            <Link to='/'>Cancel</Link>
                        </div>
                    </Box>
    
    
    
    
            </div>
        );
    }
}

export default CreateForm;
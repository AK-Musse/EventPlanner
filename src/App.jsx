import React from 'react'
import './App.css';

import EventsList from './components/EventsList/EventsList';
//import SearchBar from './components/EventsList/SearchBar';
import MenuBar from './components/MenuBar/MenuBar'
import LoginPage from './components/Pages/LoginPage/LoginPage';
import SignupPage from './components/Pages/SignupPage/SignupPage'
import userService from './utils/userService';
import eventService from './utils/eventService';
import CreatePage from './components/CreatePage/CreatePage';
import EventDetailPage from './components/EventDetailPage/EventDetailPage';
import UpdatePageForm from './components/Pages/EventUpdatePage/UpdateForm';


import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  redirect,
  Navigate
} from "react-router-dom";
// import FrontPage from './components/Pages/FrontPage/FrontPage';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      events: [],
      user: userService.getUser(),
      
      isNewUserSignedUp: false
    }
    
    this.handleLogout = this.handleLogout.bind(this)
    this.setCurrentUser = this.setCurrentUser.bind(this)
    this.updateEventListState = this.updateEventListState.bind(this)
    this.redirectToLogin = this.redirectToLogin.bind(this)
  }

  async componentDidMount(){
    const data = await eventService.list()
    this.setState({ events: data })
  }
  componentDidUpdate(){
    console.log(`events = ${JSON.stringify(this.state.events)}`)
  }

  updateEventListState(data) {
    // this.setState(state => {
    //   return { recipes: [...state.recipes, data] }
    // })
    this.setState({events: [...this.state.events, data]});
    console.log(`events = ${this.state.events}`);
  }

  setCurrentUser(userData){
    this.setState({user: userData})
  }

  updateEvent(data){
    eventService.update(data);
  }

 

  async search(){
    /**implement the search function */
    
    /**think about sending the search key as a query parameter in your url */
  }

  handleLogout(){
    userService.logout();
    this.setState({ user: null });
  }
  
  redirectIfUser(){
    console.log('loader runs...')
    const currentUser = userService.getUser()
    if(currentUser){
      return redirect('/events')
    }
    return null
  }

  redirectToLogin(){
    // this.handleLogout();
    userService.logout();
    this.setState({ user: null });
    console.log('checking for user...')
    const currentUser = userService.getUser()
    if(!currentUser){
      console.log(`user logged out`);
      return redirect('/login')
    }
    else {
      console.log(`user not logged out`);
    }
    return null    
  }

  getMenu(){
    const menu = [
      {label: 'events', showAuth: this.state.user ? true: false},
      {label: 'create', showAuth: this.state.user ? true: false},
      {label: 'logout', showAuth: this.state.user ? true: false, hasLogoutOption: true},
      {label: 'login', showAuth: this.state.user ? false: true}, 
      {label: 'signup', showAuth: this.state.user ? false: true}
      
    ]
    console.log(`getMenu called. New menu = ${JSON.stringify(menu)}`);
    return menu
  }

  getEventsOrlogin(){
    return this.state.user ? (<div className="container">
      <EventsList events={this.state.events} />
      </div>) : <Navigate to='/login' replace />
  }

  getChildRoutes(){
    
    const routes = [
      {
        path: '/login',
        element:  <LoginPage setCurrentUser={this.setCurrentUser}/>,
        loader: this.redirectIfUser
       
      },
      {
        path: '/signup',
        element: <SignupPage setCurrentUser={this.setCurrentUser}/>,
        loader: this.redirectIfUser
        
      },

      {
        path: '/events',
        element: this.getEventsOrlogin()
      },
      {
        path: '/create',
        element: <CreatePage updateEventListState={this.updateEventListState} />,
      },
      {
         path: '/events/:id',
        element: <EventDetailPage updateEventListState={this.updateEventListState} />,
      },
      {
        path: '/events/:id/update',
       element: <UpdatePageForm />,
     },
      {
        path: '/logout',
        element: <LoginPage />,
        loader: this.redirectToLogin
      }


    ]

    return routes

  }
  

  getRouter(){
    let router = createBrowserRouter([{
      path: "/",
      element: (<>
              <MenuBar menuOptions={this.getMenu()}/>
              {/* <SearchBar /> */}
              <Outlet />
              
            </>

      ),
      /** */
      children: this.getChildRoutes()

    }])
    return router   
  }

  render(){
    return (
      <>
        <RouterProvider router={this.getRouter()} />     
        
      </>
     )  
  }
}

export default App;
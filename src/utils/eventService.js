import tokenService from './tokenService';

const BASE_URL = 'http://localhost:3001/api/events'




async function index() {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
          }
    }).then(res => res.json());
}
  
async function create(event) {
  try {
      const response = await fetch(BASE_URL + '/create', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + tokenService.getToken()
          },
          body: JSON.stringify(event)
      });
      const data = await response.json();
      console.log(`event data = ${JSON.stringify(data)}`);
      return data;
  } catch (error) {
    console.log(`event create failed`);
      console.error(error);
  }
}

async function show(id) {
  const response = await fetch(BASE_URL + `/${id}`,{
    method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
  })
  const data = await response.json()
  console.log(data)
  return data
} 

async function deleteEvent(id) {
  try {
      const response = await fetch(BASE_URL + `/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + tokenService.getToken()
          }
      });
      const data = await response.json();
      console.log(data);
      return data
      
  } catch (error) {
     console.error(error);
  }
} 


async function update(id, data) {

  try {
    const response = await fetch(BASE_URL +`/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenService.getToken()
      },
      body: JSON.stringify(data)
    });

    const res = await response.json();
    console.log(`update function res = ${res}`);
    return res;
  } catch (error) {
    console.error(error);
  }
}


export default {
  list: index, 
  create,
  update,
  delete: deleteEvent,
  show
}
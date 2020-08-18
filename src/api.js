const BASE_URL = 'https://thinkful-list-api.herokuapp.com/chris-whatley'

function fetchWrapper(...args){
    let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        // if response is not 2xx, start building error object
        error = { code: res.status };

        // if response is not JSON type, place statusText in error object and
        // immediately reject promise
        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }

      // otherwise, return parsed JSON
      return res.json();
    })
    .then(data => {
      // if error exists, place the JSON message into the error object and 
      // reject the Promise with your error object so it lands in the next 
      // catch.  IMPORTANT: Check how the API sends errors -- not all APIs
      // will respond with a JSON object containing message key
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }

      // otherwise, return the json as normal resolved Promise
      return data;
    });
}

function getItems(){
    return fetchWrapper(`${BASE_URL}/items`)
}

function createItem(name){
    let newItem = {
        name
    }
    
    return fetchWrapper(
        `${BASE_URL}/items`, 
        {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newItem)})  
}

function deleteItem(id){
    return fetchWrapper(
        `${BASE_URL}/items/${id}`, 
        {method: 'DELETE'})
}

function updateItem(id, updateData){
    let updatedItem = JSON.stringify(updateData)
    return fetchWrapper(
        `${BASE_URL}/items/${id}`, 
        {method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: updatedItem})
}

export default {
    getItems,
    createItem,
    updateItem,
    deleteItem
}
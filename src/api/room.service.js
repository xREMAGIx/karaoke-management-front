//import { authHeader } from "../_helpers";
import axios from "axios";

export const roomService = {
  getAll,
  getById,
  add,
  update,
  delete: _delete,
};

async function getAll() {
  const requestConfig = {
    //headers: authHeader()
  };
  console.log(2);

  return await axios.get(`/api/rooms/`, requestConfig).then(handleResponse);
}

async function getById(id) {
  const requestConfig = {
    //headers: authHeader(),
  };
  return await axios
    .get(`/api/rooms/${id}/`, requestConfig)
    .then(handleResponse);
}

async function add(room) {
  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(room);
  console.log(body);

  return await axios
    .post("/api/rooms/", body, requestConfig)
    .then(handleResponse);
}

async function update(id, room) {
  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(room);
  console.log(body);

  return await axios
    .put(`/api/rooms/${id}/`, body, requestConfig)
    .then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {
  const requestConfig = {
    // headers: authHeader()
  };

  return await axios
    .delete(`/api/rooms/${id}/`, requestConfig)
    .then(handleResponse);
}

function handleResponse(response) {
  let data;
  if (response.data.results) data = response.data.results;
  else data = response.data;
  if (response.status === 404) {
    // if (response.status === 401) {
    //   // auto logout if 401 response returned from api
    //   //logout();
    //   location.reload(true);
    // }

    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  console.log(data);
  return data;
}

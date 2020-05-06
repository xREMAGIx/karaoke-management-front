import { authHeader } from "../store";
import axios from "axios";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
  getMe,
};

async function login(user) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(user);

  await axios
    .post(`/api/auth/login`, body, requestConfig)
    .then(handleResponse)
    .catch((error) => handleResponse(error));
}

async function getMe() {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.get(`/api/auth/me`, requestConfig).then(handleResponse);
}

async function logout() {
  // remove user from local storage to log user out
  await axios.post("/api/auth/logout");
  localStorage.removeItem("user");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`/api/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`/api/users/${id}`, requestOptions)
    .then(handleResponse)
    .catch(handleResponse);
}

async function register(user) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(user);
  await axios.post("/api/auth/register", body, config).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`/api/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`/api/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  let data;
  if (response.data.data) data = response.data.data;

  if (response.status !== 200) {
    const error = (response && response.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}

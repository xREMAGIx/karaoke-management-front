//import { authHeader } from "../store";
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
  add,
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
  const requestOptions = {};

  return axios.get(`/api/users`, requestOptions).then(handleResponse);
}

async function getById(id) {
  console.log(id);
  const requestConfig = {
    //headers: authHeader(),
  };
  return await axios
    .get(`/api/users/${id}`, requestConfig)
    .then(handleResponse);
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

async function add(user) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(user);
  await axios.post("/api/users/", body, config).then(handleResponse);
}

async function update(id, user, image) {
  const imageData = new FormData();
  imageData.append("image", image);

  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(user);

  if (imageData.get("image")) {
    try {
      await axios.put(`/api/users/${id}`, body, requestConfig);
    } catch (error) {
      console.log(error);
    }

    const configFormData = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      return await axios
        .put("/api/users/" + id + "/image", imageData, configFormData)
        .then(handleResponse);
    } catch (error) {
      console.log(error);
    }
  } else {
    return await axios
      .put(`/api/users/${id}`, body, requestConfig)
      .then(handleResponse);
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {
  const requestConfig = {
    // headers: authHeader()
  };

  return await axios
    .delete(`/api/users/${id}`, requestConfig)
    .then(handleResponse);
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

const API_URL = "http://localhost:8000";

const checkError = (res) => {
  if (!res.ok) {
    throw Error(res.status);
  }
  return res;
};

<<<<<<< HEAD
const checkErrorJson = async (res) => {
  if (!res.ok) {
    let message = `${res.status}`;

    try {
      const data = await res.json();
      message = data.error || data.detail || JSON.stringify(data);
    } catch (e) {}

    throw Error(message);
  }

  return res.json();
};

const catchError = (err) => {
  console.log("fetch error", err.message);

=======
const checkErrorJson = (res) => {
  if (res.status !== 200) {
    throw Error(res.status);
  } else {
    return res.json();
  }
};

const catchError = (err) => {
>>>>>>> b938eb0916c583536c27821d63922838a2367f85
  if (err.message === "401") {
    window.location.href = "/login";
  }
  if (err.message === "404") {
<<<<<<< HEAD
    throw Error(err.message);
=======
    return err;
>>>>>>> b938eb0916c583536c27821d63922838a2367f85
  }
};

export const fetchWithResponse = (resource, options) =>
  fetch(`${API_URL}/${resource}`, options)
    .then(checkErrorJson)
    .catch(catchError);

export const fetchWithoutResponse = (resource, options) =>
  fetch(`${API_URL}/${resource}`, options).then(checkError).catch(catchError);

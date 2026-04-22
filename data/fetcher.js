const API_URL = "http://localhost:8000";

const checkError = (res) => {
  if (!res.ok) {
    throw Error(res.status);
  }
  return res;
};

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

  if (err.message === "401") {
    window.location.href = "/login";
  }
  if (err.message === "404") {
    throw Error(err.message);
  }
};

export const fetchWithResponse = (resource, options) =>
  fetch(`${API_URL}/${resource}`, options)
    .then(checkErrorJson)
    .catch(catchError);

export const fetchWithoutResponse = (resource, options) =>
  fetch(`${API_URL}/${resource}`, options).then(checkError).catch(catchError);

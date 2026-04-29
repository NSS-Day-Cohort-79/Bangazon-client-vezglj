const API_URL = "http://localhost:8000";

const checkError = async (res) => {
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw { message: res.status.toString(), data };
  }
  return res;
};

const checkErrorJson = async (res) => {
  if (!res.ok) {
    throw Error(res.status);
  } else {
    return res.json();
  }
};

const catchError = (err) => {
  if (err.message === "401") {
    window.location.href = "/login";
  }
  if (err.message === "404") {
    return Error(err.message);
  }
};

export const fetchWithResponse = (resource, options) =>
  fetch(`${API_URL}/${resource}`, options)
    .then(checkErrorJson)
    .catch(catchError);

export const fetchWithoutResponse = (resource, options) =>
  fetch(`${API_URL}/${resource}`, options).then(checkError).catch(catchError);

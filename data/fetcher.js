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
    const data = await res.json().catch(() => null);
    console.log("FETCHER STATUS:", res.status);
    console.log("FETCHER ERROR DATA:", data);
    throw { message: res.status.toString(), data };
  } else {
    return res.json();
  }
};

const catchError = (err) => {
  if (err.message === "401") {
    window.location.href = "/login";
  }
  throw err;
};

export const fetchWithResponse = (resource, options) =>
  fetch(`${API_URL}/${resource}`, options)
    .then(checkErrorJson)
    .catch(catchError);

export const fetchWithoutResponse = (resource, options) =>
  fetch(`${API_URL}/${resource}`, options).then(checkError).catch(catchError);

//this does not matter at all

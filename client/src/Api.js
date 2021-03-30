const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://korhan-travel-log.herokuapp.com"
    : "http://localhost:1337";

export async function listLogEntries() {
  const response = await fetch(`${API_URL}/api/logging`, {
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
  });
  return response.json();
}

export async function createLogEntry(entry) {
  const response = await fetch(`${API_URL}/api/logging`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(entry),
  });
  return response.json();
}

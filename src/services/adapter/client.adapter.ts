import axios from "axios";

const ClientAdapter = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  timeout: 1000,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
});

export default ClientAdapter

import axios from "axios";

const AccountAdapter = axios.create({
  baseURL: 'https://accounts.spotify.com/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export default AccountAdapter

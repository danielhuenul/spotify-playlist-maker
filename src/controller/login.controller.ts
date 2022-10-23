import { Request, Response } from 'express'

const client_id = '3a435c57f69346d3878f55e5bf4e049f';
const client_secret = '36cdde2fa393451bbef5b520e11a891a';
const redirect_uri = 'http://localhost:8888/callback';
const stateKey = 'spotify_auth_state';

const generateRandomString = function(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export default (req: Request, res: Response) =>{
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';
  const loginUrl = `https://accounts.spotify.com/authorize` +
    `?response_type=code` +
    `&client_id=${client_id}` +
    `&scope=${scope}` +
    `&redirect_uri=${redirect_uri}` +
    `&state=${state}`

  return res.status(200).json({ url: loginUrl })
}
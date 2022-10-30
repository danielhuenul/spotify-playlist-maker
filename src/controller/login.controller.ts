import { Request, Response } from 'express'
import enviroments from '../config/enviroments'


const generateRandomString = function(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const simpleToken = Buffer.from(`${enviroments.client_id}:${enviroments.client_secret}`, 'utf-8').toString('base64');
export default (req: Request, res: Response) =>{
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';
  const url = `https://accounts.spotify.com/authorize` +
    `?response_type=code` +
    `&client_id=${enviroments.client_id}` +
    `&scope=${scope}` +
    `&redirect_uri=${enviroments.redirect_uri}` +
    `&state=${state}`

  return res.status(200).json({ url, simpleToken })
}
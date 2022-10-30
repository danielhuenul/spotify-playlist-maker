import { Response, Request } from 'express'
import { generaClientToken, generaAuthToken, getMe } from '../services/spotify.service';

export default async (req: Request, res: Response) => {
  try {
    const clientToken = await generaClientToken();
    const authorizationToken = await generaAuthToken(req.body.code);
    const auth = await getMe(authorizationToken.access_token);
    return res.status(200).json({ clientToken, authorizationToken, auth })
  } catch (error) {
    return res.status(400).json(error)
  }
}
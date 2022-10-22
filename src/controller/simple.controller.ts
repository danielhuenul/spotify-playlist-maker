import { Response, Request } from 'express'

export default (req: Request, res: Response) => {
  try {
    return res.status(200).json({ ok: true })
  } catch (error) {
    return res.status(400).json({ ok: false })
  }
}
import { Router } from 'express';
import createPlaylist from '../controller/createPlaylist.controller';
import loginPlaylist from '../controller/login.controller';
import generaToken from '../controller/generaToken.controller';
const router = Router()

router.post("/create-playlist", createPlaylist);
router.get("/login", loginPlaylist);
router.post("/token", generaToken);

export default router;
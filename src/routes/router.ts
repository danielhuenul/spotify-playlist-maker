import { Router } from 'express';
import createPlaylist from '../controller/createPlaylist.controller';
import loginPlaylist from '../controller/login.controller';
const router = Router()

router.post("/create-playlist", createPlaylist);
router.get("/login", loginPlaylist);

export default router;
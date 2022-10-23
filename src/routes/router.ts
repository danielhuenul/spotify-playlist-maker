import express from 'express';
import createPlaylist from '../controller/createPlaylist.controller';
const router = express.Router()

router.post("/create-playlist", createPlaylist);

export default router;
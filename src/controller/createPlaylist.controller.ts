import { Response, Request } from 'express'
import {
  createPlaylist,
  addTrackToPlaylist,
  getTrack,
} from '../services/spotify.service'

export default async (req: Request, res: Response) => {
  try {
    console.log("✅ INICIA CONTROLADOR");
    const { filters, playlist, userId } = req.body;
    const token = req.headers.token as string;

    console.log("✅ INICIA getTrackByTags");
    const findedtracks = await getTrackByTags(filters, token);
    console.log("✅ INICIA findedtracks: ", findedtracks);

    if (findedtracks.length === 0) {
      console.log("🛑 NO HAY RESULTADOS");
      return res.status(200).json({ ok: true, message: "no tracks by tags" })
    }

    console.log("✅ INICIA createPlaylist");
    const { id } = await createPlaylist({ playlist, userId, token });
    console.log("✅ SE OBTIENEN URLS DE TRACKS");
    const uris = findedtracks.map(({ uri }) => uri);
    console.log("✅ SE ASIGNAN TRACKS EN PLAYLIST");
    const savedTracks = await addTrackToPlaylist({ id, uris, token })

    return res.status(200).json({ savedTracks })
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getTrackByTags = async (filters: string, token: string) => {
  const splitedFilters = filters.split(";");

  const resolvePromises = splitedFilters.map(async query => {
    let isfindedQuery = false;
    let nextQuery = `query=${query}&type=track`;
    while (!isfindedQuery) {
      const { tracks } = await getTrack(nextQuery, token);

      if (tracks.items.length === 0) {
        isfindedQuery = true;
        return null
      }

      const [, next ] = tracks.next.split("search?");
      const items = tracks.items;
      const item = items.find(item => item.name.toUpperCase() === query.toUpperCase());

      isfindedQuery = item !== undefined;
      nextQuery = next
      return item
    }
  });

  const resolvedTrack = await Promise.all(resolvePromises);
  const filteredTrack = resolvedTrack.filter(track => track !== null && track !== undefined);
  return filteredTrack;
}

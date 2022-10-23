import { Response, Request } from 'express'
import {
  createPlaylist,
  addTrackToPlaylist,
  getTrack,
} from '../services/spotify.service'

export default async (req: Request, res: Response) => {
  try {
    const { filters, playlist, userId } = req.body;
    const findedtracks = await getTrackByTags(filters);

    if (findedtracks.length === 0) {
      return res.status(200).json({ ok: true, message: "no tracks by tags" })
    }

    const { id } = await createPlaylist({ playlist, userId });
    const uris = findedtracks.map(({ uri }) => uri);
    const savedTracks = await addTrackToPlaylist({ id, uris })

    return res.status(200).json({ savedTracks })
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getTrackByTags = async (filters: string) => {
  const splitedFilters = filters.split(";");

  const resolvePromises = splitedFilters.map(async query => {
    let isfindedQuery = false;
    let nextQuery = `query=${query}&type=track`;
    while (!isfindedQuery) {
      const { tracks } = await getTrack(nextQuery);

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
  const filteredTrack = resolvedTrack.filter(track => track !== null);
  return filteredTrack;
}

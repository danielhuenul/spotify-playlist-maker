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
  console.log("🚀 ~ splitedFilters", splitedFilters)

  const resolvePromises = splitedFilters.map(async query => {
    let isfindedQuery = false;
    let nextQuery = `q=${query}&type=track`;
    while (!isfindedQuery) {
      const findedTracks = await getTrack(nextQuery);
      const items = findedTracks.tracks.items;
      const item = items.find(item => item.name.toUpperCase() === query.toUpperCase());
      isfindedQuery = item !== undefined;
      nextQuery = findedTracks.tracks.next;
      return item
    }
  });

  const promisesFilter = resolvePromises.filter(promise => promise !== null && promise !== undefined)
  const resolved = await Promise.all(promisesFilter);
  return resolved;
}

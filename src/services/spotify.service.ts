import ClientAdapter from "./adapter/client.adapter";
import { AddTrack, Playlist, Track } from './types'

export const getTrack = async (query: string): Promise<Track> => {
  try {
    const response = await ClientAdapter.get<Track>(`/search?${query}`);
    return response.data
  } catch (error) {
    throw error;
  }
}

export const createPlaylist = async ({ userId, playlist }): Promise<Playlist> => {
  try {
    const url = `/users/${userId}/playlists`;
    const response = await ClientAdapter.post<Playlist>(url, playlist);
    return response.data
  } catch (error) {
    throw error;
  }
}

export const addTrackToPlaylist = async ({ id, uris }): Promise<AddTrack> => {
  try {
    const url = `/playlists/${id}/tracks?uris=${uris}`;
    const response = await ClientAdapter.post<AddTrack>(url);
    return response.data
  } catch (error) {
    throw error;
  }
}

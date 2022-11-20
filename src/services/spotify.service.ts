import enviroments from "../config/enviroments";
import ClientAdapter from "./adapter/client.adapter";
import AccountAdapter from "./adapter/account.adapter";
import { AddTrack, Playlist, Track } from './types'
import { AccesToken, AuthToken } from './types/token.types';
import QueryString from "qs";

const basicToken = Buffer.from(`${enviroments.client_id}:${enviroments.client_secret}`, 'utf-8').toString('base64');

export const getTrack = async (query: string, token): Promise<Track> => {
  try {
    const axiosCofig = {
      headers: {
        Authorization: token
      }
    }

    const response = await ClientAdapter.get<Track>(`/search?${query}`, axiosCofig);
    return response.data
  } catch (error) {
    console.log("🚀 ~ response", error.response)
    console.log("🚀 ~ data", error.response.data)
    throw error;
  }
}

export const createPlaylist = async ({ userId, playlist, token }): Promise<Playlist> => {
  try {
    const axiosCofig = {
      headers: {
        Authorization: token
      }
    }

    const url = `/users/${userId}/playlists`;
    const response = await ClientAdapter.post<Playlist>(url, playlist, axiosCofig);
    return response.data
  } catch (error) {
    console.log("🚀 ~ error", error.response.data)
    throw error;
  }
}

export const addTrackToPlaylist = async ({ id, uris, token }): Promise<AddTrack> => {
  try {
    const axiosCofig = {
      headers: {
        Authorization: token
      }
    }

    const url = `/playlists/${id}/tracks?uris=${uris}`;
    const response = await ClientAdapter.post<AddTrack>(url, {}, axiosCofig);
    return response.data
  } catch (error) {
    console.log("🚀 ~ response", error.response)
    console.log("🚀 ~ data", error.response.data)
    throw error;
  }
}

export const generaClientToken = async (): Promise<AccesToken> => {
  try {
    const data = {'grant_type':'client_credentials'};
    const axiosConfig = {
      headers: {
        'Authorization': `Basic ${basicToken}`,
      }
    }
    const response = await AccountAdapter.post<AccesToken>("/token", data, axiosConfig)
    return response.data
  } catch (error) {
    console.log("🚀 ~ response", error.response)
    console.log("🚀 ~ data", error.response.data)
    throw error;
  }
}

export const generaAuthToken = async (code: string): Promise<AuthToken> => {
  try {
    const data = QueryString.stringify({
      code,
      redirect_uri: enviroments.redirect_uri,
      grant_type: "authorization_code"
    })

    const config = {
      headers: {
        'Authorization': `Basic ${basicToken}`,
      },
    }

    const response = await AccountAdapter.post<AuthToken>("/token", data, config)
    return response.data
  } catch (error) {
    console.log("🚀 ~ response", error.response)
    console.log("🚀 ~ data", error.response.data)
    throw error;
  }
}

export const getMe = async (token: string) => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }

    const response = await ClientAdapter.get("/me", config)
    return response.data
  } catch (error) {
    console.log("🚀 ~ response", error.response)
    console.log("🚀 ~ data", error.response.data)
    throw error;
  }
}

import axios from 'axios'
import { API_URL, UPLOAD_URL } from './vars.js'

export default class MusicorumAPI {
  static getAuthStatus (token, full) {
    return axios.get(`${API_URL}/auth/me${full ? '?full=true' : ''}`, {
      headers: {
        Authorization: token
      }
    })
  }

  static getToken () {
    // eslint-disable-next-line no-undef
    return localStorage.getItem('token')
  }

  static getTwitterAuthURL () {
    return axios.get(`${API_URL}/auth/twitter`)
  }

  static getLastfmAuthURL () {
    return axios.get(`${API_URL}/auth/lastfm`)
  }

  static twitterAuthCallback (oauthToken, oauthVerifier, tokenId) {
    return axios.post(`${API_URL}/auth/twitter/callback`, {
      oauthToken,
      oauthVerifier,
      tokenId
    })
  }

  static lastfmAuthCallback (token) {
    return axios.post(`${API_URL}/auth/lastfm/callback`, { token }, {
      headers: {
        Authorization: MusicorumAPI.getToken()
      }
    })
  }

  static getSchedules () {
    return axios.get(`${API_URL}/schedules`, {
      headers: {
        Authorization: MusicorumAPI.getToken()
      }
    })
  }

  static getExecutions (id) {
    return axios.get(`${API_URL}/schedules/${id}/runs`, {
      headers: {
        Authorization: MusicorumAPI.getToken()
      }
    })
  }

  static createSchedule (schedule) {
    return axios.post(`${API_URL}/schedules`, schedule, {
      headers: {
        Authorization: MusicorumAPI.getToken()
      }
    })
  }

  static deleteSchedule (id) {
    return axios.delete(`${API_URL}/schedules/${id}`, {
      headers: {
        Authorization: MusicorumAPI.getToken()
      }
    })
  }

  static upload (file, signature) {
    return axios.post(`${UPLOAD_URL}/upload`, {
      file, signature
    }, {
      headers: {
        'content-type': 'application/json'
      }
    })
  }
}

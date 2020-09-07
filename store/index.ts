import jwt from 'jsonwebtoken'

export const state = () => ({})

export const mutations = {
  login(state: any, token: string | null) {
    state.token = token
    state.auth.loggedIn = !!token

    if (token) {
      const user = jwt.decode(token)
      state.auth.user = user
    }
  }
}

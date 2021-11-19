<template>
  <v-container fluid class="fullheight">
    <v-row align="center" justify="center" class="fullheight">
      <v-col cols="2">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row align="center" justify="center">
                <client-only>
                  <vue-telegram-login
                    :mode="loginMode"
                    telegram-login="rozninjabot"
                    :redirect-url="redirectUrl"
                    @callback="login"
                  />
                  <v-skeleton-loader
                    type="avatar, text"
                    width="280"
                    slot="placeholder"
                  ></v-skeleton-loader>
                </client-only>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import jwt from 'jsonwebtoken'

  export default {
    layout: 'blank',
    computed: {
      loginMode () {
        return this.$route.query.redirect ? 'redirect' : 'callback'
      },
      redirectUrl () {
        return this.$route.query.redirect || ''
      },
      deeplink () {
        return !!this.$route.query.deeplink
      }
    },
    methods: {
      async login(authData) {
        const { token } = await this.$axios.post('/login', authData).then(response => response.data)
        const bearerToken = `Bearer ${token}`
        this.$auth.setToken('local', bearerToken)
        this.$axios.setHeader('Authorization', bearerToken)
        this.$auth.ctx.app.$axios.setHeader('Authorization', bearerToken)

        const user = jwt.decode(token)
        this.$auth.setUser(user)

        if (this.deeplink) {
          this.$router.push(`/authSuccess?token=${token}`)
        }
      }
    },
    head() {
      return {
        title: 'Login'
      }
    }
  }
</script>

<style scoped>
  .fullheight {
    height: 100%;
  }

  .fullwidth {
    width: 100%;
  }

  .center {
    text-align: center;
  }
</style>

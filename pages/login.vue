<template>
  <v-container
    fluid
    class="fullheight"
  >
    <v-row
      align="center"
      justify="center"
      class="fullheight"
    >
      <v-col cols="4">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <vue-telegram-login
              mode="callback"
              telegram-login="rozninjabot"
              @callback="login"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import jwt from 'jsonwebtoken'
import {vueTelegramLogin} from 'vue-telegram-login'

export default {
  components: {
    vueTelegramLogin
  },
  layout: 'blank',
  methods: {
    async login (authData) {
      const { token } = await this.$axios.post('/login', authData).then(response => response.data)
      const bearerToken = `Bearer ${token}`
      this.$auth.setToken('local', bearerToken)
      this.$axios.setHeader('Authorization', bearerToken)
      this.$auth.ctx.app.$axios.setHeader('Authorization', bearerToken)

      const user = jwt.decode(token)
      this.$auth.setUser(user)
    }
  }
}
</script>

<style scoped>
.fullheight {
  height: 100%;
}
</style>

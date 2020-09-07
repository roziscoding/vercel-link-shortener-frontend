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
              mode="redirect"
              telegram-login="rozninjabot"
              redirect-url="https://roz.ninja/api/login"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {vueTelegramLogin} from 'vue-telegram-login'

export default {
  components: {
    vueTelegramLogin
  },
  layout: 'blank'
}
</script>

<style scoped>
.fullheight {
  height: 100%;
}
</style>

<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        text
        color="error"
        @click="logout"
      >
        Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      fixed
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    title: 'roz.ninja'
  }),
  methods: {
    logout() {
      this.$auth.logout().then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

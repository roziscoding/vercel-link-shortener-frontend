<template>
  <v-card>
    <v-card-text class="text-center">Clique no botão abaixo para concluir seu login</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" :href="url">
        <v-icon left>mdi-link</v-icon>
        Acessar
      </v-btn>
      <v-spacer></v-spacer>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  computed: {
    url (){
      return `/authSuccess?token=${this.$route.query.token}`
    }
  },
  head () {
    return {
      title: 'Voltar ao app'
    }
  }
}
</script>
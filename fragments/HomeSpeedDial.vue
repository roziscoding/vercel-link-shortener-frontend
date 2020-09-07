<template>
  <v-speed-dial
    v-model="fab"
    bottom
    right
    direction="top"
    open-on-hover
    transition="scale-transition"
    absolute
  >
    <template v-slot:activator>
      <v-btn
        v-model="fab"
        color="blue darken-2"
        dark
        fab
      >
        <v-icon v-if="fab">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-dots-vertical
        </v-icon>
      </v-btn>
    </template>
    <v-btn
      fab
      dark
      small
      color="green"
      @click="emitRefresh"
    >
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="indigo"
      @click="emitNew"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  data: () => ({
    fab: false
  }),
  methods: {
    emitRefresh() {
      this.$emit('refresh')
    },
    emitNew() {
      this.$emit('new')
    }
  }
}
</script>

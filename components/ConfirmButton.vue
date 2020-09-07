<template>
  <v-dialog
    v-model="show"
    persistent
    :max-width="maxWidth"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :color="color"
        v-bind="attrs"
        text
        v-on="on"
      >
        <slot />
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ text }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          :disabled="loading"
          @click="cancel"
        >
          {{ cancelText }}
        </v-btn>
        <v-btn
          color="error"
          text
          :loading="loading"
          @click="confirm"
        >
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      default: 'Yes'
    },
    cancelText: {
      type: String,
      default: 'No'
    },
    maxWidth: {
      type: Number,
      default: 400
    },
    action: {
      type: Function,
      default: null
    }
  },
  data: () => ({
    show: false,
    loading: false
  }),
  methods: {
    async confirm() {
      console.log(this.action ? this.action.toString() : 'no action')
      if (this.action) {
        this.loading = true
        await this.action()
        this.loading = false
      }

      this.show = false
      this.$emit('confirm')
    },
    cancel() {
      this.show = false
      this.$emit('cancel')
    }
  }
}
</script>

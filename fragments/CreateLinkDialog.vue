<template>
  <v-dialog
    :value="value"
    max-width="400"
    persistent
  >
    <v-card>
      <v-card-title>Criar novo link</v-card-title>
      <v-card-text>
        <v-container>
          <v-form
            ref="form"
            v-model="isValid"
          >
            <v-row>
              <v-text-field
                v-model="model.shortcode"
                label="Shortcode"
                required
                :rules="[rules.required, rules.alpha]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="model.url"
                label="Destino"
                required
                :rules="[rules.required, rules.url]"
              />
            </v-row>
          </v-form>
        </v-container>
        <v-scale-transition>
          <v-alert
            v-if="error"
            border="left"
            type="error"
            dense
          >
            {{ error }}
          </v-alert>
        </v-scale-transition>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="error"
          :disabled="loading"
          @click="close"
        >
          Cancelar
        </v-btn>
        <v-spacer />
        <v-btn
          text
          color="primary"
          :loading="loading"
          @click="create"
        >
          Enviar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { isWebUri } from 'valid-url'

const rules = {
  required: value => !!value || 'Campo obrigatório',
  alpha: value => /[0-9a-z_-]+/i.test(value) || 'Deve conter apenas letras, números, _ e -',
  url: value => !!isWebUri(value) || 'Deve ser uma URL válida, começando com o protocolo'
}

const getErrorMessage = err => {
  if (!err.response) return 'Falha na conexão com o servidor'
  return err.response.data.error ? err.response.data.error.message : err.response.data.message
}

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    rules,
    loading: false,
    model: {
      shortcode: '',
      url: ''
    },
    isValid: false,
    error: ''
  }),
  methods: {
    async create() {
      this.error = ''
      this.$refs.form.validate()
      if (!this.isValid) return
      const data = this.model
      this.loading = true
      await this.$axios
        .post('https://roz.ninja/api/links', data)
        .then(() => {
          this.$emit('refresh')
          this.close()
        })
        .catch(err => {
          this.loading = false
          console.error(err)
          this.error = getErrorMessage(err)
        })
    },
    close() {
      this.$emit('input', false)
      this.loading = false
      this.$refs.form.resetValidation()
      this.model = { shortcode: '', url: '' }
    }
  }
}
</script>

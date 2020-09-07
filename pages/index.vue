<template>
  <div>
    <v-container
      row
      justify-center
      align-center
    >
      <v-overlay
        absolute
        :value="loading"
        opacity="1"
      >
        <v-progress-circular indeterminate />
      </v-overlay>
      <v-row>
        <v-col
          v-for="link in links"
          :key="link._id"
          cols="4"
        >
          <div class="text-center">
            <v-card>
              <v-card-title>
                <span
                  class="pointer"
                  @click="copy(link.shortcode)"
                >{{ link.shortcode }}
                  <v-fade-transition
                    mode="out-in"
                    :duration="5"
                  >
                    <v-icon
                      :key="getIcon(link.shortcode)"
                      x-small
                      dense
                    >
                      {{ getIcon(link.shortcode) }}
                    </v-icon>
                  </v-fade-transition>
                </span>
              </v-card-title>
              <v-card-text>
                <span
                  class="pointer"
                  @click="copy(link.longUrl, true)"
                >{{ link.longUrl }}</span>
                <v-fade-transition
                  mode="out-in"
                  :duration="5"
                >
                  <v-icon
                    :key="getIcon(link.longUrl)"
                    x-small
                    dense
                  >
                    {{ getIcon(link.longUrl) }}
                  </v-icon>
                </v-fade-transition>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <confirm-button
                  title="Tem certeza?"
                  color="error"
                  :text="`Deseja realmente excluir ${link.shortcode}?`"
                  cancel-text="Não"
                  confirm-text="Sim"
                  :action="() => removeLink(link.shortcode)"
                >
                  Excluir
                </confirm-button>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>
      <home-speed-dial
        @refresh="fetchLinks"
        @new="creating=true"
      />
      <create-link-dialog
        v-model="creating"
        @refresh="fetchLinks"
      />
    </v-container>
  </div>
</template>

<script>
import ConfirmButton from '~/components/ConfirmButton'
import HomeSpeedDial from '~/fragments/HomeSpeedDial'
import CreateLinkDialog from '~/fragments/CreateLinkDialog'

export default {
  components: {
    ConfirmButton,
    HomeSpeedDial,
    CreateLinkDialog
  },
  middleware: 'auth',
  data: () => ({
    links: [],
    loading: true,
    creating: false,
    copied: []
  }),
  mounted() {
    this.fetchLinks()
  },
  methods: {
    fetchLinks() {
      this.loading = true

      this.$axios.get('/links').then(({ data }) => {
        this.links = data
        this.loading = false
      })
    },
    async removeLink(shortcode) {
      await this.$axios.delete(`/links/${shortcode}`)
      this.fetchLinks()
    },
    copy(shortcode, raw = false) {
      const text = raw ? shortcode : `https://roz.ninja/${shortcode}`

      navigator.clipboard.writeText(text).then(() => {
        this.copied.push(shortcode)
        setTimeout(() => {
          this.copied = this.copied.filter(i => i !== shortcode)
        }, 1000)
      })
    },
    getIcon(shortcode, raw) {
      return this.copied.includes(shortcode) ? 'mdi-check' : 'mdi-content-copy'
    }
  },
  head () {
    return {
      title: 'Painel Admin'
    }
  }
}
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>

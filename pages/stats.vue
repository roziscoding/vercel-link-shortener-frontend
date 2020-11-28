<template>
  <div>
    <h1>
      Statistics for <code>{{ shortcode }}</code>
    </h1>
    <v-container row>
      <v-row>
        <v-col cols="4">
          <v-card light>
            <v-card-text>
              <v-overlay absolute :value="loading" opacity="1">
                <v-progress-circular indeterminate />
              </v-overlay>
              <polar-area-chart
                :chart-data="countryData"
                :options="{
                  title: {
                    display: true,
                    text: 'Visits by country',
                    fontSize: 18,
                    fontColor: colors.grey.darken3
                  }
                }"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card light>
            <v-card-text>
              <v-overlay absolute :value="loading" opacity="1">
                <v-progress-circular indeterminate />
              </v-overlay>
              <polar-area-chart
                :chart-data="refData"
                :options="{
                  title: {
                    display: true,
                    text: 'Visits by reference',
                    fontSize: 18,
                    fontColor: colors.grey.darken3
                  }
                }"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card light>
            <v-card-text>
              <v-overlay absolute :value="loading" opacity="1">
                <v-progress-circular indeterminate />
              </v-overlay>
              <line-chart
                :chart-data="dateData"
                :options="{
                  title: {
                    display: true,
                    text: 'Visits by date',
                    fontSize: 18,
                    fontColor: colors.grey.darken3
                  }
                }"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-fab-transition>
        <v-btn @click="fetchStats" color="primary" fab bottom right absolute
          ><v-icon>mdi-refresh</v-icon></v-btn
        >
      </v-fab-transition>
    </v-container>
  </div>
</template>

<script>
  import colors from 'vuetify/lib/util/colors'
  import PolarAreaChart from '@/components/charts/PolarAreaChart'
  import LineChart from '@/components/charts/LineChart'

  const getRandomColor = () => {
    const keys = Object.keys(colors).filter(key => key !== 'grey' && key !== 'shades')

    const color = keys[Math.floor(Math.random() * keys.length)]

    console.log(color)

    return colors[color].base
  }

  export default {
    middleware: 'auth',
    components: {
      PolarAreaChart,
      LineChart
    },
    data: () => ({
      countryData: {},
      refData: {},
      dateData: {},
      loading: true,
      colors
    }),
    async mounted() {
      this.fetchStats()
    },
    methods: {
      async fetchStats() {
        this.loading = true
        await this.$axios
          .get('/stats', { params: { shortcode: this.shortcode } })
          .then(response => response.data)
          .then(({ countries, refs, days }) => {
            this.countryData = {
              labels: countries.map(({ _id }) => _id),
              datasets: [
                {
                  label: 'Visits',
                  backgroundColor: new Array(countries.length).fill().map(() => getRandomColor()),
                  data: countries.map(({ count }) => count)
                }
              ]
            }

            this.refData = {
              labels: refs.map(({ _id }) => _id || 'No Ref'),
              datasets: [
                {
                  label: 'Visits',
                  backgroundColor: new Array(refs.length).fill().map(() => getRandomColor()),
                  data: refs.map(({ count }) => count)
                }
              ]
            }

            this.dateData = {
              labels: days.map(({ _id }) => _id.split('-').reverse().join('/')),
              datasets: [
                {
                  label: 'Visits',
                  backgroundColor: getRandomColor(),
                  data: days.map(({ count }) => count)
                }
              ]
            }
          })

        this.loading = false
      }
    },
    head() {
      return {
        title: 'Stats'
      }
    },
    computed: {
      shortcode() {
        return this.$route.query.shortcode
      }
    }
  }
</script>

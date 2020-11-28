<script>
  import { PolarArea, mixins } from 'vue-chartjs'

  export default {
    extends: PolarArea,
    mixins: [mixins.reactiveProp],
    props: ['options'],
    mounted() {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>

<template>
  <div ref="chartDom" :style="{ height: height + 'px' }"></div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/title";
import { addListener, removeListener } from "resize-detector";
import debounce from "lodash/debounce";
export default {
  props: {
    height: {
      type: Number,
      default: () => {
        return 200;
      }
    },
    option: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  watch: {
    option(val) {
      this.chart.setOption(val);
    }
    /* option: {
      handler(val) {
        this.chart.setOption(val)
      },
      deep: true
    } */
  },
  methods: {
    resize() {
      this.chart.resize();
    },
    renderChart() {
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
    }
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  }
};
</script>
<style lang="less"></style>

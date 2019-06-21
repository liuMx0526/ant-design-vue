<template>
  <div class="about">
    <h1>分析页</h1>
    <Chart :height="chartHeight" :option="chartOption" />
    <pre v-highlightjs="chartCode">
      <code class="html"></code>
    </pre>
  </div>
</template>

<script>
import Chart from "@/components/Echarts";
import chartCode from "!!raw-loader!@/components/Echarts";
import http from "@/utils/http";
export default {
  components: {
    Chart
  },
  data() {
    return {
      chartHeight: document.documentElement.clientHeight - 190,
      chartOption: {},
      chartCode
    };
  },
  mounted() {
    this.getChartData();
    window.onresize = () => {
      return (() => {
        this.chartHeight = document.documentElement.clientHeight - 190;
      })();
    };
  },
  methods: {
    getChartData() {
      http.get("/api/dashboard/chart", { params: { ID: 123456 } }).then(res => {
        this.chartOption = {
          title: {
            text: "ECharts 入门示例"
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: res
            }
          ]
        };
      });
    }
  }
};
</script>

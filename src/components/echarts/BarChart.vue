<template>
  <v-chart class="chart" :option="option" />
</template>

<script setup>
import VChart from "vue-echarts";
import { ref } from "vue";

import { use } from "echarts/core";
import { BarChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

use([GridComponent, BarChart, CanvasRenderer]);

const option = ref({
  title: {
    text: "Last 7 Days",
    subtext: "$52,658",
    top: "30%",
    textStyle: {
      fontSize: 16,
      color: "#999",
    },
    subtextStyle: {
      fontSize: 24,
      fontWeight: "bold",
    },
  },
  tooltip: {
    trigger: "item",
  },
  grid: {
    left: "150rem",
    bottom: "15%",
    top: "10%",
    right: "5%",
  },
  confine: true,
  xAxis: {
    type: "category",
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    data: ["T", "F", "S", "S", "M", "T", "W"],
  },
  yAxis: {
    type: "value",
    show: false,
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
      showBackground: true,
      backgroundStyle: {},
      barWidth: 10,
    },
  ],
});
</script>

<style scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>

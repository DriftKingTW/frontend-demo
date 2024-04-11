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

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  legends: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: "",
  },
  subtitle: {
    type: String,
    required: false,
    default: "",
  },
});

const option = ref({
  title: {
    show: props.title.length > 0 || props.subtitle.length > 0,
    text: props.title,
    subtext: props.subtitle,
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
    data: props.legends,
  },
  yAxis: {
    type: "value",
    show: false,
  },
  series: [
    {
      data: props.data,
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

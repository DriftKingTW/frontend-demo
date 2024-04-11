<template>
  <v-chart class="chart" :option="option" />
</template>

<script setup>
import VChart from "vue-echarts";
import { ref } from "vue";

import { use } from "echarts/core";
import { BarChart, LineChart } from "echarts/charts";
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

use([
  TooltipComponent,
  LegendComponent,
  GridComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
]);

const props = defineProps({
  barData1: {
    type: Array,
    required: true,
  },
  barData2: {
    type: Array,
    required: true,
  },
  lineData: {
    type: Array,
    required: true,
  },
  dataLegends: {
    type: Array,
    required: true,
  },
  legends: {
    type: Array,
    required: true,
  },
});

const option = ref({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },
  grid: {
    bottom: "10%",
    top: "5%",
  },
  legend: {
    data: props.dataLegends,
    left: "start",
    bottom: "2%",
    itemWidth: 10,
    itemHeight: 10,
    icon: "circle",
  },
  xAxis: [
    {
      type: "category",
      data: props.legends,
      axisPointer: {
        type: "shadow",
      },
      axisLabel: {
        interval: 30,
        formatter: function (value) {
          const date = new Date(value);
          return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
          });
        },
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "Incoming",
      min: -20,
      max: 20,
      interval: 5,
      axisLabel: {
        formatter: "{value} B",
      },
    },
    {
      type: "value",
      name: "Outgoing",
      min: -20,
      max: 20,
      interval: 5,
      axisLabel: {
        formatter: "{value} B",
      },
    },
  ],
  series: [
    {
      name: "Incoming",
      type: "bar",
      stack: "Total",
      barWidth: "95%",
      tooltip: {
        valueFormatter: function (value) {
          return value + " B";
        },
      },
      data: props.barData1,
    },
    {
      name: "Outgoing",
      type: "bar",
      stack: "Total",
      barWidth: "95%",
      tooltip: {
        valueFormatter: function (value) {
          return value + " B";
        },
      },
      data: props.barData2,
    },
    {
      name: "Balance",
      type: "line",
      showSymbol: false,
      lineStyle: {
        width: 3,
      },
      symbolSize: 10,
      tooltip: {
        valueFormatter: function (value) {
          return value + " B";
        },
      },
      data: props.lineData,
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

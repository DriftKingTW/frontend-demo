<template>
  <v-chart class="chart" :option="option" />
</template>

<script setup>
import VChart from "vue-echarts";
import { ref } from "vue";

import { use } from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
]);

const option = ref({
  title: {
    text: "Transaction History in 14 Days",
    textStyle: {
      fontSize: 14,
    },
  },
  grid: {
    left: "15%",
    bottom: "15%",
  },
  confine: true,
  tooltip: {
    trigger: "axis",
    formatter: function (params) {
      return (
        params[0].name +
        "<br />" +
        params[0].marker +
        "Transactions: <b>" +
        params[0].value.toLocaleString() +
        "</b><br /><br />" +
        "Price: $" +
        Math.floor(Math.random() * 2000 + 2000).toLocaleString()
      );
    },
  },
  xAxis: {
    type: "category",
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      interval: 6,
    },
    data: [
      "Mar 9",
      "Mar 10",
      "Mar 11",
      "Mar 12",
      "Mar 13",
      "Mar 14",
      "Mar 15",
      "Mar 16",
      "Mar 17",
      "Mar 18",
      "Mar 19",
      "Mar 20",
      "Mar 21",
      "Mar 22",
      "Mar 23",
    ],
  },
  yAxis: {
    type: "category",
    axisLabel: {
      hideOverlap: false,
      margin: 30,
      interval: 5,
      formatter: function (value, index) {
        return value / 1000 + "k";
      },
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
  },
  series: [
    {
      data: [
        820000, 932000, 901000, 934000, 932000, 2000000, 934000, 932000, 901000,
        934000, 934000, 2000000, 1630000, 2100000, 2300000,
      ],
      type: "line",
      showSymbol: false,
      smooth: true,
      itemStyle: {
        color: "#2B2F33",
      },
      symbol:
        "image://data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgNjQgNjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyI+CiAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjIxNzI2LDAsMCwxLjA2MDM3LC0zLjkxMjc2LC0xLjkzOTI5KSI+CiAgICAgICAgPGVsbGlwc2UgY3g9IjI5LjUwMyIgY3k9IjMyLjAwNyIgcng9IjI2LjI4OSIgcnk9IjMwLjE3OCIgc3R5bGU9ImZpbGwtb3BhY2l0eTowLjI3OyIvPgogICAgPC9nPgo8L3N2Zz4K",
      symbolSize: 15,
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

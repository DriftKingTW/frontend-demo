<template>
  <v-chart class="chart" :option="option" :autoresize="true" />
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
});

const option = ref({
  title: {
    show: props.title.length > 0,
    text: props.title.toUpperCase(),
    textStyle: {
      fontSize: 14,
    },
  },
  grid: {
    left: "80rem",
    bottom: "15%",
  },
  confine: true,
  tooltip: {
    trigger: "axis",
    formatter: function (params) {
      return (
        new Date(params[0].name).toLocaleString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }) +
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
      formatter: function (value) {
        const date = new Date(value);
        return date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
        });
      },
    },
    data: props.legends,
  },
  yAxis: {
    type: "value",
    splitNumber: 0.5,
    min: function (value) {
      return value.min;
    },
    axisLabel: {
      hideOverlap: false,
      margin: 30,
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
      data: props.data,
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

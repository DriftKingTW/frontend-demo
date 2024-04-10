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
  legend: {
    data: ["Incoming", "Outgoing", "Balance"],
  },
  xAxis: [
    {
      type: "category",
      data: [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ],
      axisPointer: {
        type: "shadow",
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
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3, -6,
        -5, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
      ],
    },
    {
      name: "Outgoing",
      type: "bar",
      stack: "Total",
      barWidth: "95%",
      label: {
        show: true,
        position: "left",
      },
      tooltip: {
        valueFormatter: function (value) {
          return value + " B";
        },
      },
      data: [
        -120, -132, -101, -134, -190, -230, -210, -120, -132, -101, -134, -190,
        -230, -210,
      ],
    },
    {
      name: "Balance",
      type: "line",
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + " B";
        },
      },
      data: [
        -6, -5, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2, -6, -5,
        3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
      ],
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

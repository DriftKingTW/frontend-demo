<template>
  <v-chart class="chart" :option="option" :autoresize="true" />
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
    right: "100rem",
    left: "100rem",
  },
  legend: {
    data: props.dataLegends,
    left: "5%",
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
      name: "Incoming/Outgoing",
      nameLocation: "middle",
      nameGap: 50,
      min: -20,
      max: 20,
      interval: 5,
      axisLabel: {
        formatter: "{value} B",
      },
    },
    {
      type: "value",
      name: "Balance",
      nameLocation: "middle",
      nameGap: 50,
      nameRotate: 270,
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
      emphasis: {
        label: {
          show: true,
          position: "top",
          distance: 0,
          offset: [0, 10],
          color: "#FFF",
          fontSize: 20,
          textBorderColor: "#5470C6",
          textBorderWidth: 4,
          formatter: function () {
            return "●";
          },
        },
      },
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
      emphasis: {
        label: {
          show: true,
          position: "bottom",
          distance: 0,
          offset: [0, -10],
          color: "#FFF",
          fontSize: 20,
          textBorderColor: "#91CC75",
          textBorderWidth: 4,
          formatter: function () {
            return "●";
          },
        },
      },
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

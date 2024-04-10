<template>
  <v-chart class="chart" :option="option" />
</template>

<script setup>
import VChart from "vue-echarts";
import { ref } from "vue";

import { use } from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
]);

const option = ref({
  title: {
    text: "Assets",
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
  legend: {
    left: "start",
    bottom: "5%",
    itemWidth: 10,
    itemHeight: 10,
    icon: "circle",
  },
  series: [
    {
      name: "Currency",
      type: "pie",
      radius: ["55%", "70%"],
      avoidLabelOverlap: false,
      center: ["80%", "50%"],
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 18,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "USDC" },
        { value: 735, name: "ETH" },
        { value: 580, name: "BTC" },
        { value: 272, name: "Other" },
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

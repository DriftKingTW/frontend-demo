<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import LineSmooth from "@/components/echarts/LineSmooth.vue";
import BarChart from "@/components/echarts/BarChart.vue";
import PieChart from "@/components/echarts/PieChart.vue";
import LineBarChart from "../components/echarts/LineBarChart.vue";

// --- Data ---
const panel = ref([0]);
const headers = ref([
  { title: "Date Created", key: "date" },
  { title: "Description", key: "description" },
  { title: "Amount", key: "amount" },
  { title: "Status", key: "status" },
]);
const paymentHistory = reactive([]);
const transactionHistoryChartData = reactive([]);
const transactionHistoryChartDate = reactive([]);
const transactionHistoryChartKey = ref(0);

const lastSevenDaysChartData = reactive([]);
const lastSevenDaysChartDate = reactive([]);
const lastSevenDaysChartKey = ref(0);

const assetsChartData = reactive([]);
const assetsChartKey = ref(0);

const trendingChartIncomingData = reactive([]);
const trendingChartOutgoingData = reactive([]);
const trendingChartBalanceData = reactive([]);
const trendingChartDate = reactive([]);
const trendingChartKey = ref(0);

// --- Functions ---
/**
 * Generate 10 random data to paymentHistory
 * @param {void}
 * @return {Array}
 */
const generateRandomData = () => {
  // Sample dataset
  const descriptionDataset = [
    "Buy a car",
    "Buy a cow",
    "Buy a drink",
    "Buy a bicycle",
    "Pay for dinner",
    "Buy a table",
  ];

  // Generate a list of 10 random payment history
  const sampleDataset = Array.from({ length: 10 }, (_, i) => ({
    id: uuidv4(),
    date: new Date(
      2023,
      2 + Math.floor(Math.random() * 4),
      1 + Math.floor(Math.random() * 30),
      8 + Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 60)
    ).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    description: descriptionDataset[i % descriptionDataset.length],
    amount: Math.floor(Math.random() * 400) * 5, // From 5 to 2000 and can be divided by 5
    status: Math.random() > 0.5 ? "Success" : "Failed",
  }));

  // Remove , between date and time in sampleDataset
  const formattedSampleDataset = sampleDataset.map((item) => {
    const [date, time] = item.date.split(",");
    return { ...item, date: `${date} ${time}` };
  });

  return formattedSampleDataset;
};

/**
 * Load more data to paymentHistory
 * @param {Object} options
 * @param {Function} options.done
 * @return {void}
 */
const tableScrollLoad = ({ done }) => {
  setTimeout(() => {
    paymentHistory.push(...generateRandomData());
    paymentHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    done("ok");
  }, 1000);
};

/**
 * Fetch sample data for charts
 * @param {void}
 * @return {void}
 */
const fetchSampleData = async () => {
  // Generate random data for transaction history chart
  const startDate = new Date(2024, 2, 9);
  const endDate = new Date(2024, 2, 23);
  const dateRange = Array.from(
    { length: (endDate - startDate) / (24 * 60 * 60 * 1000) + 1 },
    (_, i) => new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
  );
  transactionHistoryChartDate.push(...dateRange);

  // random value from 1000k to 2000k, and the value can be divided by 50k
  transactionHistoryChartData.push(
    ...Array.from(
      { length: dateRange.length },
      () => Math.floor(Math.random() * 2000 + 1000) * 1000
    )
  );
  transactionHistoryChartKey.value++;

  // Generate random data for last 7 days chart
  lastSevenDaysChartData.push(
    ...Array.from({ length: 7 }, () => Math.floor(Math.random() * 200 + 50))
  );
  lastSevenDaysChartDate.push(...["T", "F", "S", "S", "M", "T", "W"]);
  lastSevenDaysChartKey.value++;

  // Add sample data to assets chart
  assetsChartData.push(
    ...[
      {
        value: 1048,
        name: "USDC",
      },
      {
        value: 735,
        name: "ETH",
      },
      {
        value: 580,
        name: "BTC",
      },
      {
        value: 484,
        name: "Other",
      },
    ]
  );
  assetsChartKey.value++;

  // Generate random data for trending chart
  trendingChartIncomingData.push(
    ...Array.from({ length: 60 }, () => Math.floor(Math.random() * 20))
  );
  trendingChartOutgoingData.push(
    ...Array.from({ length: 60 }, () => Math.floor(Math.random() * 20) - 20)
  );
  // Calculate balance data
  trendingChartBalanceData.push(
    ...trendingChartIncomingData.map((incoming, index) => {
      return incoming + trendingChartOutgoingData[index];
    })
  );
  // Generate date range
  trendingChartDate.push(
    ...Array.from({ length: 60 }, (_, i) => {
      const date = new Date(2024, 2, 1 + i);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
      });
    })
  );
  trendingChartKey.value++;
};

// --- Lifecycle Hooks ---

onMounted(() => {
  // Add sample data to paymentHistory
  paymentHistory.push(...generateRandomData());
  paymentHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

  fetchSampleData();
});
</script>

<template>
  <v-container>
    <v-row>
      <!-- Left Section -->
      <v-col cols="8">
        <v-row>
          <!-- Trading Status -->
          <v-col cols="12">
            <v-card variant="outlined">
              <v-card-title class="bg-grey-darken-3"
                >Trading Status</v-card-title
              >
              <v-card-text>
                <v-row class="mt-2">
                  <v-col cols="4" class="d-flex figures-row">
                    <LineSmooth
                      title="Transaction History in 14 Days"
                      :data="transactionHistoryChartData"
                      :legends="transactionHistoryChartDate"
                      :key="transactionHistoryChartKey"
                      class="fill-height"
                    />
                    <v-divider vertical></v-divider>
                  </v-col>
                  <v-col cols="4" class="d-flex figures-row">
                    <BarChart
                      title="Last 7 Days"
                      subtitle="$52,658"
                      class="fill-height"
                      :data="lastSevenDaysChartData"
                      :legends="lastSevenDaysChartDate"
                      :key="lastSevenDaysChartKey"
                    />
                    <v-divider vertical></v-divider>
                  </v-col>
                  <v-col cols="4" class="d-flex figures-row">
                    <PieChart
                      title="Assets"
                      subtitle="$52,658"
                      class="fill-height"
                      :data="assetsChartData"
                      :key="assetsChartKey"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Payment History -->
          <v-col cols="12">
            <v-card variant="outlined">
              <v-card-text class="pa-0">
                <v-expansion-panels v-model="panel">
                  <v-expansion-panel>
                    <v-expansion-panel-title
                      class="text-h6 pl-4 bg-grey-darken-3"
                    >
                      Payment History
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="expansion-panel-no-padding">
                      <v-infinite-scroll
                        height="h-screen"
                        :items="paymentHistory"
                        @load="tableScrollLoad"
                        class="pb-4"
                      >
                        <v-data-table
                          id="#scroll-table"
                          :headers="headers"
                          :items="paymentHistory"
                          :items-per-page="-1"
                          item-value="id"
                        >
                          <template #item.status="{ item }">
                            <v-chip
                              :color="
                                item.status === 'Success' ? 'success' : 'error'
                              "
                              :prepend-icon="
                                item.status === 'Success'
                                  ? 'mdi-check'
                                  : 'mdi-close'
                              "
                              size="small"
                            >
                              {{ item.status }}
                            </v-chip>
                          </template>
                          <template #item.amount="{ item }">
                            ${{ item.amount.toLocaleString() }}
                          </template>
                          <template #bottom></template>
                        </v-data-table>
                      </v-infinite-scroll>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- Right Section -->
      <v-col cols="4">
        <v-card variant="outlined">
          <v-card-title class="bg-grey-darken-3">Trending</v-card-title>
          <v-card-text>
            <v-row class="mt-2">
              <v-col cols="12" style="height: 80vh">
                <LineBarChart
                  class="chart"
                  :barData1="trendingChartIncomingData"
                  :barData2="trendingChartOutgoingData"
                  :lineData="trendingChartBalanceData"
                  :legends="trendingChartDate"
                  :dataLegends="['Incoming', 'Outgoing', 'Balance']"
                  :key="trendingChartKey"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.expansion-panel-no-padding:v-deep(.v-expansion-panel-text__wrapper) {
  padding: 0;
}

.figures-row {
  height: 200px;
}
</style>

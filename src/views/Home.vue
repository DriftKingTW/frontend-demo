<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { v4 as uuidv4 } from "uuid";

// --- Data ---
const panel = ref([0]);
const headers = ref([
  { title: "Date Created", key: "date" },
  { title: "Description", key: "description" },
  { title: "Amount", key: "amount" },
  { title: "Status", key: "status" },
]);
const paymentHistory = reactive([]);

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

// --- Lifecycle Hooks ---

onMounted(() => {
  // Add sample data to paymentHistory
  paymentHistory.push(...generateRandomData());
  paymentHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
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
                  <v-col cols="4">
                    <v-card variant="tonal">
                      <v-card-text>
                        <p>Figure 1</p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="4">
                    <v-card variant="tonal">
                      <v-card-text>
                        <p>Figure 2</p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="4">
                    <v-card variant="tonal">
                      <v-card-text>
                        <p>Figure 3</p>
                      </v-card-text>
                    </v-card>
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
                    <v-expansion-panel-text>
                      <v-data-table
                        :headers="headers"
                        :items="paymentHistory"
                        :items-per-page="-1"
                        fixed-header
                        class="fill-height"
                        item-value="id"
                      >
                        <template #bottom></template>
                      </v-data-table>
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
              <v-col cols="12">
                <v-card variant="tonal" style="height: 600px">
                  <v-card-text>
                    <p>Figure 4</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>

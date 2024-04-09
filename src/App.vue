<script setup></script>

<template>
  <v-app>
    <v-app-bar flat>
      <template v-slot:prepend>
        <v-icon class="ms-4">mdi-home</v-icon>
      </template>

      <v-app-bar-title>Frontend Demo</v-app-bar-title>

      <template v-slot:append>
        <v-btn icon="mdi-cog"></v-btn>

        <v-btn icon="mdi-account-circle"></v-btn>
      </template>
    </v-app-bar>
  </v-app>
</template>

<style scoped></style>

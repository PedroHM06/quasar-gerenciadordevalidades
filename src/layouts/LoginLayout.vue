<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
        <q-toolbar-title>
          Gerenciador de Validades
        </q-toolbar-title>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

defineOptions({
  name: 'LoginLayout'
})

</script>

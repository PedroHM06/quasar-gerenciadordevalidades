<template>
  <q-page padding>
    <div class="row justify-center">
      <p class="text-body1">Estamos quase terminando seu cadastro!</p>
    </div>
    <div class="row justify-center">
      <p class="text-body1">
        Por favor confirme seu email para finalizar o Registro:
        <strong>{{ $route.query.email }}</strong>
      </p>
    </div>
    <div class="row justify-center">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-btn
          label="Voltar para Login"
          color="primary"
          class="full-width"
          rounded
          :to="{ name: 'login' }"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageEmailConfirmation",
});
</script>

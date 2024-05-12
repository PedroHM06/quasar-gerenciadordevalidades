<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center">Registro de Usuário</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          filled
          label="Nome"
          v-model="form.name"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Digite seu nome para se registrar',
          ]"
        />
        <q-input
          filled
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Digite um email para se registrar',
          ]"
          type="email"
        />

        <q-input
          filled
          label="Senha"
          v-model="form.password"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length >= 6) || 'Digite no mínimo 6 caracteres',
          ]"
        />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Registrar"
            color="primary"
            class="full-width"
            rounded
            type="submit"
          />
        </div>
        <div class="full-width q-pt-md">
          <q-btn
            label="Voltar"
            color="primary"
            class="full-width"
            rounded
            flat
            :to="{ name: 'login' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "PageRegister",

  setup() {
    const router = useRouter();

    const { register } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    const form = ref({
      name: "",
      email: "",
      password: "",
    });

    const handleRegister = async () => {
      try {
        await register(form.value);
        notifySuccess("Você foi registrado com sucesso!");
        router.push({
          name: "email-confirmation",
          query: { email: form.value.email },
        });
      } catch (error) {
        notifyError("Ocorreu algum erro com seu registro.");
      }
    };

    return {
      form,
      handleRegister,
    };
  },
});
</script>

<style scoped>
</style>

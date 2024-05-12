<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          filled
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Preencha seu email']"
          type="email"
        />

        <q-input
          filled
          label="Senha"
          v-model="form.password"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Preencha sua senha']"
        />
        <div class="full-width q-pt-md">
          <q-btn
            label="Entrar"
            color="primary"
            class="full-width"
            type="submit"
          />
        </div>
        <div class="full-width">
          <q-btn
            label="Registre-se"
            color="primary"
            class="full-width"
            flat
            to="/register"
          />
        </div>
        <div class="full-width">
          <q-btn
            label="Recuperar senha"
            color="primary"
            class="full-width"
            flat
            to="/forgot-password"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageLogin",

  setup() {
    const router = useRouter();

    const { login, isLoggedIn } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    const form = ref({
      email: "",
      password: "",
    });

    onMounted(() => {
      if (isLoggedIn()) {
        router.push({ name: "me" });
      }
    });

    const handleLogin = async () => {
      try {
        await login(form.value);
        notifySuccess("Login Efutuado com sucesso.");
        router.push({ name: "me" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      handleLogin,
    };
  },
});
</script>
<style scoped>
</style>

<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center">Recuperação de Senha</p>
      <div class="col-mid-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Nova senha"
          v-model="password"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length >= 6) || 'Digite no mínimo 6 caracteres',
          ]"
        />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Enviar nova senha"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRoute, useRouter } from "vue-router";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "PageResetPassword",
  setup() {
    const { resetPassword } = useAuthUser();

    const router = useRouter();

    const route = useRoute();

    const token = route.query.token;

    const password = ref("");

    const { notifyError, notifySuccess } = useNotify();

    const handlePasswordReset = async () => {
      try {
        await resetPassword(token, password.value);
        notifySuccess("Senha alterada com sucesso");
        router.push({ name: "login" });
      } catch (error) {
        notifyError("Houve algum erro com");
      }
    };
    return {
      password,
      handlePasswordReset,
    };
  },
});
</script>
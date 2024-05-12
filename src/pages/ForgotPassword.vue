<template>
  <q-page padding>
    <q-form
      class="row justify-center"
      @submit.prevent="handleForgotPassword"
      style
    >
      <p class="col-12 text-h5 text-center">Recuperação de Senha</p>
      <div class="col-mid-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          filled
          label="Email"
          v-model="email"
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'Preencha o email para a recuperação de senha',
          ]"
          type="email"
        />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Enviar"
            color="primary"
            class="full-width"
            type="submit"
          />

          <q-btn
            label="Voltar"
            color="primary"
            class="full-width"
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
import useNotify from "src/composables/UseNotify";
export default defineComponent({
  name: "PageForgotPassword",
  setup() {
    const { sendPasswordRestEmail } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    const email = ref("");

    const handleForgotPassword = async () => {
      try {
        await sendPasswordRestEmail(email.value);
        notifySuccess(`Email de recuperação enviado para : ${email.value}`);
      } catch (error) {
        notifyError(error.message);
      }
    };
    return {
      email,
      handleForgotPassword,
    };
  },
});
</script>
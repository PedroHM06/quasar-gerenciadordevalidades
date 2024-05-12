import { useQuasar } from 'quasar'

export default function useNotify () {
    const $q = useQuasar()

    const notifySuccess = (message) => {
        $q.notify({
            type: 'positive',
            message: message ||'Ocorreu tudo certo'          
        }) 
    }

    const notifyError = (message) => {
        $q.notify({
            type: 'negative',
            message: message ||'Ocorreu algum erro'          
        }) 
    }

    return{
        notifySuccess,
        notifyError
    }
}

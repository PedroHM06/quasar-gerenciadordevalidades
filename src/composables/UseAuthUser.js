
import useSupabase from 'src/boot/supabase'
import {ref} from 'vue'

const user = ref(null)
export default function useAuthUser(){
    const { supabase } = useSupabase() 
        
    const login = async ({ email, password} ) => {
        const { user, error } = await supabase.auth.signInWithPassword({ email, password })
        if(error) throw error 
        return user
    }

    const loginWithSocialProvider = async (provider) => {
        const { user, error } = await supabase.auth.signInWithPassword({ provider })
        if(error) throw error
        return user
    }

    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        if(error) throw error
    }

    const isLoggedIn = () => {
        return !!user.value

    }

    const register = async ({ email, password, ...meta }) => {
        const { user, error } = await supabase.auth.signUp(
            { 
                email : email,
                password: password,
                options : {
                    data: {
                        name : meta.name
                    }

                },
                redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`
            }
        )
        if(error) throw error
         return user
    }

    const update = async (data) => {
        const { user, error } = await supabase.auth.update(data)
        if(error) throw error
        return user
    }

    const sendPasswordRestEmail = async (email) => {
        const { user, error } = await supabase.auth.resetPasswordForEmail(email)
        if(error) throw error
        return user
    }

    const resetPassword = async (acessToken, newPassword) =>{
        const { user, error } = await supabase.auth.updateUser(
            acessToken,
            {password : newPassword }
        )
        if(error) throw error
        return user
    }

    return{
        user,
        login,
        loginWithSocialProvider,
        logout,
        isLoggedIn,
        register,
        update,
        sendPasswordRestEmail,
        resetPassword
    }
}
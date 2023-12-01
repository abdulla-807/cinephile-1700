import { defineStore } from 'pinia';
import { useShared } from "./shared";
import app from '../firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const useUser = defineStore('user', {
    state: () => ({
        user: null
    }),
    actions: {
        async registerUser(email, pass){
            const sharedStore = useShared()
            try {
                sharedStore.setLoading(true)
                sharedStore.clearError();
                const auth = getAuth(app);
                const result = await createUserWithEmailAndPassword(auth, email, pass)
                console.log(result);
                this.user = {id: result.user.uid}
                sharedStore.setLoading(false);
            } catch (error) {
                // console.log(error);
                sharedStore.setError(error.message)
                sharedStore.setLoading(false);
                throw error;
            }
        }
    },
})
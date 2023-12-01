<template>
    <div class="enter container">
        <form @submit.prevent="userReg" action="" class="enter__form">
            <label class="enter__label">
                <span>E-mail</span>
                <input v-model="user.email" type="email" placeholder="Введите e-mail" required>
            </label>
            <label class="enter__label">
                <span>Придумайте пароль</span>
                <input v-model="user.pass" type="password" placeholder="Введите пароль" required>
            </label>
            <label class="enter__label">
                <span>Повторите пароль</span>
                <input @input="setConfirm" v-model="user.confPass" type="password" placeholder="Повторите пароль" required>
            </label>
            <p v-if="!confirm" class="enter__confirm">Пароли не совпадают!</p>
            <button v-if="!loading" class="enter__submit">Регистрация</button>
            <div class="loading loading_sm" v-else>
                <div class="loading__spiner"></div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUser } from "../../store/user";
import { useShared } from "../../store/shared";
import { useRouter } from "vue-router";
const router = useRouter();
const sharedStore = useShared();
const userStore = useUser();
const loading = computed( ()=>sharedStore.loading )
let user = ref({
    email: '',
    pass: '',
    confPass: ''
})
let confirm = ref(true);
function setConfirm() {
    let {pass, confPass} = user.value;
    confirm.value = pass == confPass ? true : false;   
}

function userReg() {
    let {email, pass} = user.value;
    if (confirm.value && email && pass) {
        userStore.registerUser(email, pass)
        .then(()=>{
            router.push({name: 'home'})
        })
        .catch((err)=>{ 
            sharedStore.setError(err.message)
            setTimeout(() => {
                sharedStore.clearError()
            }, 5000);
        })
    }
}

</script>

<style lang="scss" scoped>

</style>
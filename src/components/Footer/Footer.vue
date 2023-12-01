<template>
    <footer id="footer" class="footer">
        <ul class="footer__social">
            <li v-for="item, index in icons" :key="index">
                <a :href="item.link" class="footer__link">
                    <font-awesome-icon :icon="item.icon" />
                </a>
            </li>
        </ul>
        <p class="footer__desc">© 2022 CINEPHILE. Может содержать информацию, не предназначенную для несовершеннолетних</p>
        <p class="footer__desc">Данные получены с сайта themoviedb.org</p>
        <img src="../../assets/img/proweb.svg" alt="" class="footer__logo">
    </footer>
</template>

<script setup>
import { ref } from "vue";
let icons = ref([
    { link: 'https://web.telegram.org/k/', icon: ['fab', 'telegram'] },
    { link: 'https://vk.com/', icon: ['fab', 'vk']},
    { link: 'https://www.facebook.com/', icon: ['fab', 'facebook']},
    { link: 'https://www.instagram.com/', icon: ['fab', 'instagram']},
    { link: 'https://www.tiktok.com/', icon: ['fab', 'tiktok']},
    { link: 'https://www.youtube.com/', icon: ['fab', 'youtube']},
    { link: 'https://twitter.com/?lang=ru', icon: ['fab', 'twitter']},
    { link: 'https://ru.linkedin.com/', icon: ['fab', 'linkedin']},
])

</script>

<style lang="scss">

</style>
<template>
    <section class="container list-content">
        <h2 class="list-content__title">
            {{ type == 'movie' ? 'Все фильмы' : 'Все сериалы' }}
        </h2>
        <Pagination :top="true" 
        :currentPage="currentPage" 
        @emitPage="changeRoute"
        :totalPages="totalPages"
        />
        <div class="loading loading_relative" v-if="loading">
            <div class="loading__spiner"></div>
        </div>
        <div class="list-content__wrapper">
            <ListItem v-for="item, index in allContent" :key="index" :item="item" :title="type" />
        </div>
        
        <Pagination :currentPage="currentPage" 
        @emitPage="changeRoute"
        :totalPages="totalPages"
        />
    </section>
</template>

<script setup>
const props = defineProps({
    type: String
})
import ListItem from './ListItem.vue';
import Pagination from '../Pagination/Pagination.vue';
import { usePopular } from "../../store/popular.js";
import { computed, ref, watch } from "vue";
import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();
const popularStore = usePopular();
let currentPage = ref(1);
popularStore.getPopular(props.type, currentPage.value);
const totalPages = computed(()=>popularStore.maxPages);
const routeId = computed(()=> route.query.page ? +route.query.page : 1);
console.log(routeId);
// const content = computed(() => props.type == 'movie' ? popularStore.moviesList : popularStore.tvsList);
let loading = ref(false);
const allContent = ref([]);
async function getContent(page=1) {
    loading.value = true;
    currentPage.value = page;
    await popularStore.getPopular(props.type, currentPage.value);
    let state = props.type == 'movie' ? popularStore.moviesList : popularStore.tvsList;
    allContent.value = state;
    loading.value = false
}
// getContent()

function changeRoute(page) {
    router.push({ path: `/${props.type}`, query: { page: page } });
    getContent(page);
}
changeRoute(routeId.value)

// window.addEventListener('scroll', ()=>{
//     let download = document.body.clientHeight - footer.clientHeight <= window.scrollY + window.innerHeight;
//     if (download) {
//         getContent();
//     }
   
// })

</script>

<style lang="scss"></style>
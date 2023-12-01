<template>
    <div class="search container">
        <input v-model="searchValue" type="text" class="search__input" placeholder="Найти фильм, сериал...">
        <div class="search__wrapper">
            <SearchItem v-for="item, index in multiData" :item="item" :key="index"/>
        </div>
        <div class="loading loading_relative" v-if="loading">
            <div class="loading__spiner"></div>
        </div>
    </div>
</template>

<script setup>
import { useSearch } from "../../store/search";
import { computed, onBeforeUnmount, ref } from "vue";
import SearchItem from './SearchItem.vue'
let searchStore = useSearch();
let timerId = null;
let currentPage = ref(1);
let loading = ref(false);
let totalPages = computed(()=> searchStore.totalPages);
async function getContent() {
    if (!loading.value && currentPage.value < totalPages.value) {
        loading.value = true;
        currentPage.value++;
        await searchStore.getSearch(currentPage.value);
        loading.value = false;
    }
}
function searchArray(cb, delay) {
    if (timerId) {
        clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
        cb();
    }, delay);
}
const searchValue = computed({
    get: ()=> searchStore.search,
    set: (val)=>{
        searchStore.search = val;
        searchArray(searchStore.getSearch, 500)
    }
})
const multiData = computed(()=> searchStore.searchList)

onBeforeUnmount(()=>{
    searchStore.search = '';
    searchStore.searchList = [];
})

window.addEventListener('scroll', ()=>{
    let download = document.body.clientHeight - footer.clientHeight <= window.scrollY + window.innerHeight;
    if (download) {
        getContent()
    }
})

</script>

<style lang="scss">

</style>
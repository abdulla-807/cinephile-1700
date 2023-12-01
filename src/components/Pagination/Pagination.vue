<template>
    <div class="pagin" :class="{pagin_top: top}">
        <ul class="pagin__menu">
            <li class="pagin__btn" v-if="prevPage" @click="changePage(prevPage)">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </li>
            <li class="pagin__num" 
            v-if="starLinks" 
            v-for="item in starLinks" :key="item"
            :class="{active: item == currentPage}"
            @click="changePage(item)">
                {{ item }}
            </li>
            <li class="pagin__num" v-if="prevDots" @click="changePage(prevDots)">
                ...
            </li>
            <li class="pagin__num" 
            v-if="centerLinks" 
            v-for="item in centerLinks" :key="item"
            :class="{active: item == currentPage}"
            @click="changePage(item)">
                {{ item }}
            </li>
            <li class="pagin__num" v-if="nextDots" @click="changePage(nextDots)">
                ...
            </li>
            <li class="pagin__num" 
            v-if="endLinks" 
            v-for="item in endLinks" :key="item"
            :class="{active: item == currentPage}"
            @click="changePage(item)">
                {{ item }}
            </li>
            <li class="pagin__btn" v-if="nextPage" @click="changePage(nextPage)">
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </li>
        </ul>
    </div>
</template>

<script setup>
const emit = defineEmits(['emitPage']);

const props = defineProps({
    top: {
        type: Boolean,
        default: false
    },
    currentPage: {
        type: Number,
        default: 1
    },
    totalPages: Number
})
import { ref, watch } from "vue";
let prevPage = ref(null);
let nextPage = ref(null);
let prevDots = ref(null);
let nextDots = ref(null);
let starLinks = ref(null);
let endLinks = ref(null);
let centerLinks = ref(null);

function createNums(page) {
    let lastPage = props.totalPages;
    prevPage.value = page > 1 ? page - 1 : null;
    nextPage.value = lastPage > page ? page + 1 : null ;
    prevDots.value = page - 3 > 1 ? page - 3 : null;
    nextDots.value = page + 3 < lastPage ? page + 3 : null;
    starLinks.value = prevDots.value ? [1, 2] : page == 4 ? [1,2,3,4,5] : [1,2,3,4];
    endLinks.value = nextDots.value ? [lastPage--, lastPage].reverse() : 
                    lastPage - 3 == page ? [lastPage--, lastPage--, lastPage--, lastPage--, lastPage].reverse() : 
                    [lastPage--, lastPage--, lastPage--, lastPage].reverse();
    centerLinks.value = nextDots.value && prevDots.value ? [page - 1, page, page + 1] : null;
}
createNums(props.currentPage)

function changePage(page) {
    createNums(page)
    emit('emitPage', page)
}

// watch(
//     ()=>props.currentPage,
//     ()=>{
//         createNums(props.currentPage)
//     }
// )
watch(
    ()=>props.totalPages,
    ()=>{
        createNums(props.currentPage)
    }
)

</script>

<style lang="scss">

</style>
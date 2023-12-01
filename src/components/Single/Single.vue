<template>
    <div class="single">
        <SingleContent :current="getInfoId" :type="type"/>
        <Additional :current="getInfoId"/>
        <Recommend :current="getRecommend" :type="type"/>
    </div>
</template>

<script setup>
const props = defineProps({
    type: String
})
import SingleContent from './SingleContent.vue';
import Additional from './Additional.vue';
import Recommend from './Recommend.vue';
import { useRoute } from 'vue-router';
import { useDetails } from "../../store/details";
import { useRecommend } from "../../store/recommend";
import { computed, onBeforeUnmount, watch } from "vue";
let detailsStore = useDetails();
let recommendStore = useRecommend();
const route = useRoute()

let routeId = computed(()=> route.params.id);
detailsStore.getDetails(routeId.value, props.type);
recommendStore.getRecommend(routeId.value, props.type);
let getInfoId = computed(()=>detailsStore.info);
let getRecommend = computed(()=> recommendStore.info);

onBeforeUnmount(()=>{
    detailsStore.info = null;
})

watch(routeId, (val)=>{ 
    detailsStore.getDetails(val, props.type);
    recommendStore.getRecommend(val, props.type);
})

</script>

<style lang="scss">

</style>
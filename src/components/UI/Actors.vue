<template>
    <div class="actor" v-for="item, index in getActors" :key="index">
        <img v-if="item.profile_path" :src="imgUrl + item.profile_path" alt="" class="actor__img">
        <span class="actor__name">{{ item.name }}</span>
    </div>
</template>

<script setup>
 const props = defineProps(['type', 'id', 'count'])
 import { useActors } from "../../store/actors";
 import { computed } from "vue";
 import { imgUrl } from "../../static";
 let actorsStore = useActors();
 actorsStore.getActors(props.type, props.id, props.count);
 let getActors = computed(()=> props.type == 'movie' ? actorsStore.actorsMovie : actorsStore.actorsTv)
 
</script>

<style lang="scss">

</style>
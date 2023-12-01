<template>
    <router-link :to="`/${title}/${item.id}`" class="list-content__item">
        <img v-lazy="imgUrl + item.poster_path" alt="" class="list-content__img">
        <h3 class="list-content__name">
            {{ item.title || item.name}}
        </h3>
    </router-link>
</template>

<script setup>
import { imgUrl } from "../../static";

const props = defineProps({
    item: Object,
    title: String
})

</script>

<style lang="scss">

</style>
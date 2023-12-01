<template>
    <router-link :to="`/${page}/${id}`" class="more">
        <font-awesome-icon :icon="['fas', 'bars-staggered']" class="more__icon"/>
        Подробнее
    </router-link>
</template>

<script setup>
const props = defineProps({
    id: Number,
    page: {
        type: String,
        default: 'movie'
    }
})
</script>

<style lang="scss"></style>
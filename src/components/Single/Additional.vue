<template>
    <div class="additional container" v-if="current">
        <div class="additional__card" v-if="current.budget">
            <h4 class="additional__title">Бюджет</h4>
            <p class="additional__desc">${{ current.budget.toLocaleString() }}</p>
        </div>
        <div class="additional__card" v-if="current.revenue">
            <h4 class="additional__title">Сборы</h4>
            <p class="additional__desc">${{ current.revenue.toLocaleString() }}</p>
        </div>
        <div class="additional__card" v-if="current.status">
            <h4 class="additional__title">Статус</h4>
            <p class="additional__desc">{{ current.status }}</p>
        </div>
        <div class="additional__card" v-if="current.original_title || current.original_name">
            <h4 class="additional__title">Исходное название</h4>
            <p class="additional__desc">{{ current.original_title || current.original_name }}</p>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps(['current'])
</script>

<style lang="scss">

</style>
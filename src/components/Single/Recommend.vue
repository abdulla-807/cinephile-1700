<template>
    <div class="recommend container" v-if="current">
        <h2 class="recommend__title">{{ current.length > 0 ? 'Рекомендации' : 'Нет рекомендаций'}}</h2>
        <div class="recommend__content">
            <router-link :to="`/${type}/${item.id}`" v-for="item, index in current" :key="item.id">
                <img v-lazy="imgUrl + item.poster_path" alt="" class="recommend__img" :class="{recommend__img_no: !item.poster_path}">
            </router-link>            
        </div>
    </div>
</template>

<script setup>
import { imgUrl } from '../../static';

const props = defineProps({
    current: Array,
    type: String
})
</script>

<style lang="scss">

</style>
<template>
    <section class="info" :class="{active: open}">
        <Transition name="infoblock">
        <div class="info__wrapper" v-if="current">
            <img :src="imgUrlFull + current.backdrop_path" alt="" class="info__img">
            <div class="info__content">
                <h2 class="info__title">{{ current.name || current.title }}</h2>
                <p class="info__desc">{{ current.overview }}</p>
                <p class="info__about">
                    {{ new Date( current.first_air_date || current.release_date ).getFullYear() }}, 
                    {{ current.genres.map((elem)=> elem.name).join(', ') }}
                    <span class="info__time" v-if="current.runtime">
                        {{ new Date(0, 0, 0, 0, current.runtime).getHours() }}h 
                        {{ new Date(0, 0, 0, 0, current.runtime).getMinutes() }}m
                    </span>
                </p>
                <div class="info__actors">
                    <Actors :type="type" :id="current.id" count="4"/>
                </div>
                <BtnMore :id="current.id" :page="type"/>
            </div>
        </div>
        </Transition>
        <font-awesome-icon :icon="['fas', 'xmark']" class="info__close" @click="$emit('close')" />
    </section>
</template>

<script setup>
    import { imgUrlFull } from "../../static";
    const props = defineProps({
        current: Object,
        open: Boolean,
        type: String
    })
</script>

<style lang="scss">
.infoblock-enter-active,
.infoblock-leave-active {
  transition: 0.5s ease;
}

.infoblock-enter-from,
.infoblock-leave-to {
  opacity: 0;
  transform: scale(1.5);
}
</style>
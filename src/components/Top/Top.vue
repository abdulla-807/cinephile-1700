<template>
  <Transition name="content">
    <section v-if="content.length" class="rated">
        <h2 class="rated__title">
            ТОП
            <span class="rated__subtitle">10</span>
        </h2>
        <swiper 
        :modules="modules" 
        :slides-per-view="5.5" 
        :space-between="24" 
        navigation
        :breakpoints="breakpoints"
        >
            <swiper-slide class="rated__item" v-for="item, index in content">
              <router-link :to="'/movie/' + item.id">
                <img v-lazy="imgUrl + item.poster_path" alt="" class="rated__img">
                <div class="rated__content">
                    <p>{{ index + 1 }}</p>
                </div>
              </router-link>
            </swiper-slide>
           
        </swiper>
    </section>
    <div class="loading" v-else>
        <div class="loading__spiner"></div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, ref } from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { imgUrl } from "../../static";
import { useTop } from "../../store/topRated";

let modules = ref([Navigation]);
let breakpoints = {
    // when window width is >= 320px
    200: {
      slidesPerView: 1,
    },
    900: {
      slidesPerView: 1.5,
    },
    1140: {
      slidesPerView: 2,
    },
    1380: {
      slidesPerView: 2.5,
    },
    1600: {
      slidesPerView: 3,
    },
    1900: {
      slidesPerView: 3.3,
    }    
}
let topStore = useTop(); 
topStore.getTop()
let content = computed( ()=> topStore.list )

</script>

<style lang="scss">

</style>
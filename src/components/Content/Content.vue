<template>
  <Transition name="content">
    <section class="content" v-if="content.length">
        <router-link :to="'/' + type" class="content__title">
            {{ type == "movie" ? 'Фильмы' : 'Сериалы'}}
            <font-awesome-icon :icon="['fas', 'angle-right']" class="content__icon" />
        </router-link>
        <swiper 
        :modules="modules" 
        :slides-per-view="5.5" 
        :space-between="24" 
        navigation
        :breakpoints="breakpoints"
        >
            <swiper-slide @click="getInfo(item, index)" class="content__item" v-for="item, index in content" :class="{active: index === activeSlide}">
                <img v-lazy="imgUrl + item.poster_path" alt="" class="content__img">
                <h3 class="content__subtitle">{{ item.title || item.name }}</h3>
                <font-awesome-icon :icon="['fas', 'play']" class="content__arrow" />
                <router-link :to="`/${type}/${item.id}`" class="content__media-link"></router-link>
            </swiper-slide>
            <swiper-slide class="content__item">
                <router-link :to="'/' + type" class="content__link">
                    <font-awesome-icon :icon="['fas', 'angle-right']" class="content__icon content__icon_big" />
                    <span>{{ type == "movie" ? 'Все фильмы' : 'Все сериалы'}}</span>
                </router-link>
            </swiper-slide>
        </swiper>
        <div ref="info">
          <InfoBlock @close="close" :current="current" :open="open" :type="type"/>
        </div>
    </section>
    <div class="loading" v-else>
        <div class="loading__spiner"></div>
    </div>
  </Transition>
</template>

<script setup>
import { usePopular } from "../../store/popular";
import { computed, ref } from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { imgUrl } from "../../static";
import InfoBlock from '../InfoBlock/InfoBlock.vue';
import { useDetails } from "../../store/details";

const props = defineProps({
  type: String
})

let modules = ref([Navigation]);
const popularStore = usePopular();
popularStore.getPopular(props.type);
const content = computed(() => props.type == 'movie' ? popularStore.moviesList : popularStore.tvsList)
let breakpoints = {
    // when window width is >= 320px
    200: {
      slidesPerView: 1.5,
    },
    768: {
      slidesPerView: 2.5,
    },
    992: {
      slidesPerView: 3.5,
    },
    1300: {
      slidesPerView: 3.5,
    },
    1600: {
      slidesPerView: 4.5,
    },
    1900: {
      slidesPerView: 5.5,
    }    
}
let current = ref(null);
const detailsStore = useDetails();
const info = ref();
let open = ref(false);
let activeSlide = ref(null);

async function getInfo(item, index) {
  activeSlide.value = index;
  current.value = null
  open.value = true;
  await detailsStore.getDetails(item.id, props.type)
  current.value = detailsStore.info;
  let infoTop = info.value.offsetTop - headerId.offsetHeight;
  window.scrollTo({
    top: infoTop,
    behavior: "smooth",
  });
}  
function close() {
  open.value = false;
  current.value = null;
  activeSlide.value = null;
}
</script>

<style lang="scss">
.content-enter-active,
.content-leave-active {
  transition: 0.5s ease;
}

.content-enter-to {
    opacity: 1;
    transform: scale(1);
}
.content-enter-from {
    opacity: 0;
    transform: scale(0);
}
</style>
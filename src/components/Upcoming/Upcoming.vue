<template>
<Transition name="upcoming">
    <div class="upcoming" v-if="getUpcomingArray.length > 0">
        <UpcomingItem v-for="item, index in getUpcomingArray" :key="index"
        :movie="item" :index="index" :slideView="slideView"
        :next="getUpcomingArray[index + 1 == getUpcomingArray.length ? 0 : index + 1]"
        @nextSlide="nextSlide"/>
    </div>
    <div class="loading" v-else>
        <div class="loading__spiner"></div>
    </div>
</Transition>
</template>

<script setup>
import UpcomingItem from './UpcomingItem.vue';
import { useUpcoming } from "../../store/upcoming";
import { computed, ref } from "vue";
let upcomingStore = useUpcoming();
let slideView = ref(0)
let timeout = ref(null);
setTimeout(() => {
    upcomingStore.getUpcoming()    
}, 1000);
const getUpcomingArray = computed(()=> upcomingStore.list)
function nextSlide() {    
    clearTimeout(timeout.value);
    autoplay()
}

function autoplay() {
    if (getUpcomingArray.value.length - 1 == slideView.value) {
        slideView.value = 0;
    } else {
        slideView.value++        
    }
    timeout.value = setTimeout( autoplay, 5000);
}
autoplay()
</script>

<style lang="scss">
.upcoming-enter-active,
.upcoming-leave-active {
  transition: 0.5s ease;
}

.upcoming-enter-to {
    opacity: 1;
    transform: scale(1);
}
.upcoming-enter-from {
    opacity: 0;
    transform: scale(0);
}
</style>
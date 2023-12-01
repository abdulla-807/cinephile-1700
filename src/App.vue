<template>
  <div>
    <Navbar/>
    <router-view></router-view>
    <FooterVue/>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar/Navbar.vue';
import FooterVue from './components/Footer/Footer.vue';

</script>

<style lang="scss" scoped>

</style>
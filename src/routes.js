import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import Home from './pages/Home.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: Home, name: 'home' },
        { path: '/tv', component: ()=> import('./pages/Serials.vue'), name: 'tvs' },
        { path: '/tv/:id', component: ()=> import('./pages/SerialsId.vue'), name: 'tvsid' },
        { path: '/movie', component: ()=> import('./pages/Films.vue'), name: 'movies' },
        { path: '/movie/:id', component: ()=> import('./pages/FilmsId.vue'), name: 'moviesid' },
        { path: '/search', component: ()=> import('./pages/Search.vue'), name: 'search' },
        { path: '/enter', component: ()=> import('./pages/Enter.vue'), name: 'enter' },
    ],
    linkActiveClass: 'active',
    scrollBehavior(){
        return { top: 0}
    }
})

export default router;
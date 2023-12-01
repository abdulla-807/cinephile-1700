import { defineStore } from 'pinia';
import { options } from "../static";

export const useUpcoming = defineStore('upcoming', {
    state: () => ({ 
        list: []
    }),
    getters: {
     
    },
    actions: {
        async getUpcoming(){
            try {
                const result = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=ru&page=1', options);
                const data = await result.json();
                this.list = data.results.filter((item)=> item.backdrop_path != null)
                // console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    },
})
import { defineStore } from 'pinia';
import { options } from "../static";

export const useActors = defineStore('actors', {
    state: () => ({ 
        actorsMovie: [],
        actorsTv: [],
    }),
    actions: {
        async getActors(type='movie', id, count){
            try {
                const result = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?language=ru`, options)
                const data = await result.json();
                let array = count ? data.cast.slice(0, count) : data.cast;
                if (type == 'movie') {
                    this.actorsMovie = array;
                } else {
                    this.actorsTv = array;
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
})
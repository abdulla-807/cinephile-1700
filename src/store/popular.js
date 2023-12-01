import { defineStore } from 'pinia';
import { options } from "../static";

export const usePopular = defineStore('popular', {
    state: () => ({ 
        moviesList: [],
        tvsList: [],
        totalPages: 1
    }),
    actions: {
        async getPopular(type, page=1){
            try {
                const result = await fetch(`https://api.themoviedb.org/3/${type}/popular?language=ru&page=${page}`, options);
                if (result.ok == false) {
                    throw new Error('Данные не найдены')
                }
                const data = await result.json();
                this.totalPages = data.total_pages;
                let array = data.results.filter((item)=> item.poster_path != null);
                if (type == 'movie') {
                    this.moviesList = array;
                } else {
                    this.tvsList = array;
                }
                console.log(page);
            } catch (error) {
                console.log(error);
            }
        }
    },
    getters: {
        maxPages(state){
            return state.totalPages > 500 ? 500 : state.totalPages;
        }
    }
})
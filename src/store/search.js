import { defineStore } from 'pinia';
import { options } from "../static";

export const useSearch = defineStore('search', {
    state: () => ({ 
        searchList: [],
        search: '',
        totalPages: 1
    }),
    actions: {
        async getSearch(page=1){
            try {
                const result = await fetch(`https://api.themoviedb.org/3/search/multi?query=${this.search}&include_adult=false&language=ru&page=${page}`, options);
                const data = await result.json();
                this.totalPages = data.total_pages;
                let array = data.results.filter((item)=> item.poster_path != null);
                if (page > 1) {
                    this.searchList.push(...array)
                } else {
                    this.searchList = array;                    
                }
                // console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    },
})
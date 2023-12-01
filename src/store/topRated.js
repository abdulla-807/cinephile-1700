import { defineStore } from 'pinia';
import { options } from "../static";

export const useTop = defineStore('top', {
    state: () => ({ 
        list: []
    }),
    actions: {
        async getTop(){
            try {
                const result = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=ru&page=1', options)
                const data = await result.json();
                let array = data.results.filter((item)=> item.poster_path != null);
                array.length = 10;
                this.list = array;
                // console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    },
})
import{x as $,y as k,r as x,b as L,o,d as m,w as B,e as g,f as i,u as p,i as P,t as V,g as d,q as h,A as b,c as n,B as C,F as D,k as j,j as H,a as N}from"./index-8a2256ec.js";const T=$("search",{state:()=>({searchList:[],search:"",totalPages:1}),actions:{async getSearch(t=1){try{const a=await(await fetch(`https://api.themoviedb.org/3/search/multi?query=${this.search}&include_adult=false&language=ru&page=${t}`,k)).json();this.totalPages=a.total_pages;let s=a.results.filter(r=>r.poster_path!=null);t>1?this.searchList.push(...s):this.searchList=s}catch(e){console.log(e)}}}}),U={alt:"",class:"search__img"},q={class:"search__name"},z={__name:"SearchItem",props:{item:Object},setup(t){return(e,a)=>{const s=x("router-link"),r=L("lazy");return o(),m(s,{to:`/${t.item.media_type}/${t.item.id}`,class:"search__item"},{default:B(()=>[g(i("img",U,null,512),[[r,p(P)+t.item.poster_path]]),i("h3",q,V(t.item.title||t.item.name),1)]),_:1},8,["to"])}}},A={class:"search container"},E={class:"search__wrapper"},F={key:0,class:"loading loading_relative"},I=i("div",{class:"loading__spiner"},null,-1),M=[I],O={__name:"Search",setup(t){let e=T(),a=null,s=d(1),r=d(!1),f=h(()=>e.totalPages);async function v(){!r.value&&s.value<f.value&&(r.value=!0,s.value++,await e.getSearch(s.value),r.value=!1)}function w(c,l){a&&clearTimeout(a),a=setTimeout(()=>{c()},l)}const _=h({get:()=>e.search,set:c=>{e.search=c,w(e.getSearch,500)}}),y=h(()=>e.searchList);return b(()=>{e.search="",e.searchList=[]}),window.addEventListener("scroll",()=>{document.body.clientHeight-footer.clientHeight<=window.scrollY+window.innerHeight&&v()}),(c,l)=>(o(),n("div",A,[g(i("input",{"onUpdate:modelValue":l[0]||(l[0]=u=>_.value=u),type:"text",class:"search__input",placeholder:"Найти фильм, сериал..."},null,512),[[C,_.value]]),i("div",E,[(o(!0),n(D,null,j(y.value,(u,S)=>(o(),m(z,{item:u,key:S},null,8,["item"]))),128))]),p(r)?(o(),n("div",F,M)):H("",!0)]))}},Y={class:"main"},J={__name:"Search",setup(t){return(e,a)=>(o(),n("main",Y,[N(O)]))}};export{J as default};
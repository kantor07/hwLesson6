Vue.component('formFilter', {
    data(){
        return {
            searchLine: ''
        }
    },
       
    template: 
        `<form action="#" class="search-form" @submit.prevent="$parent.filter(searchLine)">
            <input type="text" class="search-field" v-model="searchLine">
            <button class="btn-search" type="submit">
            <i class="fas fa-search"></i>
            </button>
        </form>`
   })
Vue.component('error', {
    data(){
        return {
            infoError: ''
        }
    },

    methods: {
        errorHandler(error){
            this.infoError = error
        }
      }, 

    template: 
        `<div>
            <p>{{infoError}}</p>
        </div>`
   })
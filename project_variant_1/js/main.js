const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app', 
    data: {
        searchLine:'',
        showCart: false,
        cartUrl: '/getBasket.json',
        catalogUrl: '/catalogData.json',
        products: [],
        cartItems: [],
        filtered: [],
        formHeader:'',
        imgCatalog: 'https://placehold.it/200x150',
        imgCart: 'https://placehold.it/50x100'
    },
    
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.errorHandler(error);
                 //  alert(error);
                })
        },
        addProduct(product){
            this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let find = this.cartItems.find(el => el.id_product === product.id_product);
                    if(find){
                        find.quantity++;
                    } else {
                    //    let prod = Object.assign({quantity: 1}, product);
                     let prod = {
                        id_product: product.id_product,
                        price: product.price,
                        product_name: product.product_name,
                        quantity: 1
                      };
                        this.cartItems.push(prod)
                        console.log(prod)
                    }
                } else {
                    alert('Error');
                }
            })
        },
        remove(item) {
            this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result === 1) {
                    if(item.quantity>1){
                        item.quantity--;
                    } else {
                        this.cartItems.splice(this.cartItems.indexOf(item), 1)
                    }
                }
            })
        },
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
            console.log(this.filtered)
            console.log(value)
        }
    },
    mounted(){
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
       this.getJson(`${API + this.catalogUrl}`)
           .then(data => {
               for(let el of data){
                   this.products.push(el);
                   this.filtered.push(el);
               }
           });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
    }
})


const { createApp, ref, computed,reactive,toRefs } = Vue;

const app = createApp({
    setup() {
        // const product = ref('Boots');
        // const brand = ref('SE 331');
        // const description = ref('Boots are shoes that protect the feet and lower legs, and they come in various types depending on their purpose and design, such as work boots, military boots, hiking boots, snow boots, riding boots, and fashion boots, etc.');

        // const image = computed(() => {
        //     return variants.value[selectedVariant.value].image;
        // });

        // const link = ref('https://www.camt.cmu.ac.th.');
        // const inStock = computed(() => {
        //     return variants.value[selectedVariant.value].quantity;
        // });
        // const inventory = ref(100);
        // const onSale = ref(true);
        // function toggleSale(){
        //     onSale.value = !onSale.value;
        // }

        // const details = ref([
        //     '50% cotton',
        //     '30% wool',
        //     '20% polyester'
        // ]);

        // const variants = ref([
        //     { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
        //     { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 20 }
        // ]);

        // const selectedVariant = ref(0);
        // const size = ref(['S','M','L']);

        // function updateVariant(index) {
        //     selectedVariant.value = index;
        // }

        // const cart = ref([]);
        // const premium =ref(true);
        // function updateCart(id){
        //     cart.value.push(id)
        // }
        // function togglePremium(){
        //     premium.value = !premium.value;
        // }

        // function addToCart() {
        //     if (inStock.value) {
        //         cart.value += 1;
        //         console.log(`Item added to cart. Current cart count: ${cart.value}`);
        //     } else {
        //         alert('This item is currently out of stock.');
        //     }
        // }

        // const title = computed(() => {
        //     return brand.value + ' ' + product.value
        // });

        // const saleStatus = computed(() => {
        //     return onSale.value ? `${brand.value} ${product.value} is on sale` : '';
        // });

        // function updateImage(variantImage) {
        //     image.value = variantImage;
        // }

        // const toggleInStock = () => {
        //     // 确保 selectedVariant 指向有效的索引
        //     if (variants.value[selectedVariant.value]) {
        //         // 使用新的对象替换旧的对象
        //         const newVariant = { ...variants.value[selectedVariant.value] };
        //         newVariant.quantity = newVariant.quantity === 0 ? 50 : 0;
        //         variants.value[selectedVariant.value] = newVariant;

        //         console.log(`Stock status changed to: ${inStock.value ? 'In Stock' : 'Out of Stock'}`);
        //     } else {
        //         console.error('Selected variant is invalid.');
        //     }
        // };
        // // const toggleInStock = () => {inStock.value = !inStock.value};
        // const cartCounts = ref({});
        // function updateCart(id){
        //     cartCounts.value[id] = (cartCounts.value[id] || 0) + 1;
        // }

        // return {
        //     product,
        //     brand,
        //     title,
        //     description,
        //     image,
        //     link,
        //     inStock,
        //     inventory,
        //     onSale,
        //     details,
        //     variants,
        //     cart,
        //     addToCart,
        //     updateImage,
        //     toggleInStock,
        //     selectedVariant,
        //     updateVariant,
        //     saleStatus,
        //     size,
        //     toggleSale,
        //     premium,
        //     togglePremium,
        //     updateCart
        // };

        const cart = ref([])      
        const premium = ref(true)   
        const premiumMessage = computed(() =>{
            return premium.value ? 'You are a premium member!' : 'You are not a premium member.';
        });
        function updateCart(id) {
            cart.value.push(id)
               }
                
  
        function  removeFromCart(id) {
                if (this.cart[id]) {
                    if (this.cart[id] > 1) {
                        this.cart[id]--;
                    } else {
                        delete this.cart[id];
                    }
                }
            }

        return {
            cart,
            premium,
            premiumMessage,
            updateCart,
            removeFromCart,
        }
    }
})

app.component('product-display',productDisplay)
app.component('review-form', reviewForm)
app.component('review-list',reviewList)
app.mount('#app')

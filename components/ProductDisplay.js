const productDisplay = {
    
        template:
            /*html*/
            `
        <div class="product-display">
         	      <div class="product-container">
                        <div class="product-image">
                            <img :src="image" :class="{ 'out-of-stock-image': !inStock }">
                        </div>
                    </div>
                </div>
                <div class="product-info">
                    <a :href="link" ><h1>{{title}}</h1></a>
                    <p v-if="inStock > 10">In Stock</p>
                    <p v-else-if="inventory <= 10 && inventory > 0">Almost out of Stock</p>
                    <p>In Stock: {{ inStock ? 'Yes' : 'No' }}</p>
                    <h>{{description}}</h>
                    <p v-else>Out of Stock</p>
                    <p>Shipping : {{shipping}}</p>
                    <p v-if="onSale">On Sale</p>
                    <p v-else="onSale">Sold Out</p>
                    <p>{{saleStatus}}</p>
                    <p>{{size}}</p>
                    <ul>
                        <li v-for="detail in details">{{detail}}</li>
                    </ul>
                    <product-details :details="details"></product-details>
                    <h5 v-if=""variants.length>
                        <div v-for="(variant,index) in variants" :key="variant.id"
                    @mouseover="updateVariant(index)"
                    class="color-circle" :style="{backgroundColor:variant.color}">
                        {{variant.color}}
                    </div>

                    </h5>
                    
                    <button @click="toggleSale">Toggle Sale</button>
                    <button class="button" :disabled='!inStock'
                     @click="addToCart" :class="{disabledButton:!inStock}">Add To Cart</button>
                    <button class="button" @click="toggleInStock">InStock</button>
                    <button @click="togglePremium">Toggle Premium</button>
                    <div v-if="cartCounts">
                    <p v-for="(count, id) in cartCounts" :key="id">
                    {{ getProductById(id).color }}: {{ count }}
                     </p>
                     <button class="button" :disabled="!inStock" @click="removeFromCart" :class="{ disabledButton: !inStock }">Remove From Cart</button>
                    </div>
                    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"></review-form>
                </div>
           
        `,
        props:{
            premium:Boolean
        },
        setup(props,{emit}) {
            const shipping = computed(()=>{
                if(props.premium){
                    return 'Free'
                }else{
                    return 30
                }
            })
            const reviews = ref([])
            const product = ref('Boots')
            const producurl = ref('https://www.camt.cmu.ac.th')
            const brand = ref('SE 331')
            const onSale = ref(true)
            // const image = ref('./assets/images/socks_green.jpg')
            // const inStock = ref(true)
            const inventory = ref(100)
            const size = ref([
                'L',
                'M',
                'S'
            ])
            const details = ref([
                '50% cotton',
                '30% wool',
                '20% polyester'
            ])
            const variants = ref([
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
            ])
            const selectedVariant = ref(0)
            const cart = ref(0)
            function updateVariant(index) {
                selectedVariant.value = index;
            }
            const image = computed(() => {
                return variants.value[selectedVariant.value].image
            })
            const inStock = computed(() => {
                return variants.value[selectedVariant.value].quantity
            })
            function addToCart() {
                cart.value += 1
                emit('add-to-cart',variants.value[selectedVariant.value].id)
            }
            const title = computed(() => {
                return brand.value + ' ' + product.value
            })
            function updateImage(variantImage) {
                image.value = variantImage
            }
            const saleMessage = computed(() => {
                if (onSale.value) {
                    return `${brand.value} ${product.value} is on sale`;
                }
                return '';
            })
            function addReview(review){
                reviews.value.push(review)
                }
            const cartCounts = ref({});
            function updateCart(id) {
            cartCounts.value[id] = (cartCounts.value[id] || 0) + 1;
            emit('add-to-cart', variants.value[selectedVariant.value].id);
            }
            function removeFromCart(id) {
                
                if (cartCounts.value[id] > 0) {
                    cartCounts.value[id]--;
                    if(cartCounts.value[id] === 0) {
                        delete cartCounts.value[id];
                    }
                }
            }
            function getProductById(id) {
                return variants.value.find(variant => variant.id === id);
            }
        
            
            return {
                title,
                image,
                cart,
                inStock,
                inventory,
                details,
                variants,
                addToCart,
                updateImage,
                updateVariant,
                shipping,
                cartCounts,
                getProductById,
                updateCart,
                removeFromCart,
                reviews,
                producurl,
                onSale,
                size,
                saleMessage,
                addReview
            }
        }
    }

var product = Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">
    <div class="product-image">
      <img :src="image" />
    </div>
    <div class="product-info">
      <h1>{{ product }}</h1>
      <p v-if="inStock">In Stock</p>
      <p :class="{ lineThroughClass: !inStock }" v-else>Out of Stock</p>
      <p>{{ sale }}</p>

      <a :href="link" target="_blank">More product here</a>
      <div style="margin-top: 20px">
        <span v-if="onSale">On Sale!</span>
      </div>

      <ul>
        <li v-for="size in sizes">{{ size }}</li>
      </ul>
    <button v-on:click="addToCart" :class="{ disabledButton: !inStock }" style="border-radius: 4px">Add to cart</button>
    <button v-on:click="removeToCart" style="border-radius: 4px">Remove to cart</button>
    </div>
  </div>`,
  data() {
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
      link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
      selectedVariant: 0,
      onSale: true,
      inStock: true,
      sizes: ["S", "M", "L", "XL"],
      variants: [
            {
              variantId: 2234,
              variantColor: 'green',
              variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
              variantQuantity: 10
            },
            {
              variantId: 2235,
              variantColor: 'blue',
              variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
              variantQuantity: 0
            }
          ],
    }
  },
  methods: {
    removeToCart() {
      this.$emit('remove-to-cart', this.variants[this.selectedVariant].variantId)
    },
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
  },
  computed: {
    sale() {
      if (this.onSale) {
        return this.brand + ' ' + this.product + ' are on Sale !'
      }
        return this.brand + ' ' + this.product + ' are not on Sale !'
    },
  },
})

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: []
  },
  components: {
    product: product
  },
  methods: {
    updateToCart(id) {
      this.cart.push(id)
    },
    updateLessToCart(id) {
      for(var i = this.cart.length - 1; i >= 0; i--) {
         if (this.cart[i] === id) {
          this.cart.splice(i, 1);
        }
      }
    }
  }
})

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
      <div class="cart">
        <p>Cart({{ cart }})</p>
      </div>
    </div>
  </div>`,
  data() {
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
      link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
      onSale: true,
      inStock: true,
      sizes: ["S", "M", "L", "XL"],
      cart: 0
    }
  },
  methods: {
    removeToCart() {
      this.cart -= 1
    },
    addToCart() {
      this.cart += 1
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
    premium: true
  },
  components: {
    product: product
  },
})

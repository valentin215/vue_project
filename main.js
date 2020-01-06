var eventBus = new Vue()

var productReview = Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

      <p v-if="errors.length">
        <b>Please corrert the errors:</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>Would your recommend this product ?</p>
        <label>Yes
        <input type="radio" v-model="reco" value="Yes">
        </label>
        <label>No
        <input type="radio" v-model="reco" value="No">
        </label>
      <p>
        <input type="submit" value="Submit">
      </p>

    </form>
    `,
    data() {
      return {
        name: null,
        review: null,
        rating: null,
        reco: null,
        errors: []
      }
    },
    methods: {
      onSubmit() {
        if (this.name && this.review && this.rating) {
          let productReview = {
          name: this.name,
          review: this.review,
          reco: this.reco,
          rating: this.rating
        }
        eventBus.$emit('review-submitted', productReview)
        this.name = null
        this.reco = null
        this.review = null
        this.rating = null
      }
      else {
        if(!this.name) this.erros.push("Name required.")
        if(!this.review) this.erros.push("Name required.")
        if(!this.rating) this.erros.push("Name required.")
      }
     }
    }
  })

var productTabs = Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template: `
  <div>
  <span class="tab"
        :class="{activeTab: selectedTab === tab}"
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectedTab = tab"
        >{{ tab }}</span>

  <div v-show="selectedTab === 'Reviews'"">
    <h2>Reviews</h2>
    <ul>
      <li v-for="review in reviews">
        <p> {{ review.name }} </p>
        <p> {{ review.rating }} </p>
        <p> {{ review.review }} </p>
        <p> {{ review.reco }} </p>
      </li>
    </ul>
    </div>
     <product-review v-show="selectedTab === 'Make a Review'"></product-review>
     </div>`,
  data() {
    return {
      tabs: ['reviews', 'Make a Review'],
      selectedTab: 'Reviews'
    }
  }
})

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
    <product-tabs :reviews="reviews"></product-tabs>
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
          reviews: []
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
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview)
    })
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: []
  },
  components: {
    product: product,
    productReview: productReview,
    productTabs: productTabs
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

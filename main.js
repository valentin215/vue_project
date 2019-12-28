var app = new Vue({
  el: '#app',
  data: {
    brand: 'Vue Mastery'
    product: 'Socks',
    image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
    link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
    onSale: true,
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    cart: 0
  },
  methods: {
    removeToCart: function () {
      this.cart -= 1
    },
    addToCart: function () {
      this.cart += 1
    },
  },
  computed: {
    sale() {
      if (this.onSale) {
        return this.brand + ' ' + this.product + 'are on Sale !'
      }
        return this.brand + ' ' + this.product + 'are not on Sale !'
    },
  },
})

<template>
  <b-overlay :show="show" rounded="sm">
    <div class="content">
      <b-container>
        <b-row cols="1" cols-md="2" cols-lg="3">
          <product-cart
            class="card-cart"
            v-for="product in displayProducts"
            :key="product.id"
            :product="product"
          ></product-cart>
        </b-row>
        <div class="pagination">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            first-text="First"
            prev-text="Prev"
            next-text="Next"
            last-text="Last"
            @input="paginate"
          ></b-pagination>
        </div>
      </b-container>
    </div>
  </b-overlay>
</template>

<script>
import ProductCart from "../components/ProductCart.vue";
export default {
  name: "HomeView",
  data() {
    return {
      show: true,
      perPage: 6,
      currentPage: 1,
      displayProducts: [],
    };
  },
  components: {
    ProductCart,
  },
  methods: {
    paginate() {
      let start = (this.currentPage - 1) * this.perPage;
      this.displayProducts = this.products.slice(start, start + this.perPage);
    },
  },
  computed: {
    products() {
      return this.$store.getters.getProducts;
    },
    rows() {
      return this.products.length;
    },
  },
  created() {
    this.$store.dispatch("getProducts");
  },
  watch: {
    products() {
      this.show = false;
      this.paginate();
    },
  },
};
</script>

<style>
.content {
  min-height: 92vh;
  padding-top: 40px;
}
.pagination {
  margin: 15px auto;
}
.card-cart {
  padding: 0 15px;
}
</style>

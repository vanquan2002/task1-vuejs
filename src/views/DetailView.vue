<template>
  <div class="cart-detail">
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">
        <b-col cols="12" md="auto">
          <b-overlay :show="show" rounded="sm">
            <b-card
              title="Card with overlay"
              :aria-hidden="show ? 'true' : null"
            >
              <b-card no-body class="overflow-hidden" style="max-width: 540px">
                <b-row no-gutters>
                  <b-col md="6">
                    <b-card-img
                      :src="dataProduct.image"
                      alt="Image"
                      class="rounded-0"
                    ></b-card-img>
                  </b-col>
                  <b-col md="6">
                    <b-card-body :title="dataProduct.title">
                      <b-card-text>
                        {{ dataProduct.description }}
                      </b-card-text>
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>

              <b-row>
                <b-col cols="12">
                  <div class="control-btn">
                    <button class="btn-back-home" @click="backToHome">
                      Back to home
                    </button>
                    <button class="btnAddCard" @click="addToCart">
                      Add to cart
                    </button>
                  </div>
                </b-col>
              </b-row>
            </b-card>
          </b-overlay>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import addCartMixin from "@/mixins/addCartMixin";
import toastMessage from "@/mixins/toastMessage";
export default {
  mixins: [addCartMixin, toastMessage],
  data() {
    return {
      selectedProductId: this.$route.params.id,
      show: true,
      product: null,
    };
  },
  created() {
    this.$store.dispatch("selectedProduct", this.selectedProductId);
  },
  computed: {
    dataProduct() {
      return this.$store.getters.getSelectedProductData;
    },
  },
  methods: {
    backToHome() {
      this.$router.push("/");
    },
  },
  watch: {
    dataProduct(to) {
      this.show = false;
      this.product = to;
    },
    $route(to) {
      this.show = true;
      this.selectedProductId = to.params.id;
      this.$store.dispatch("selectedProduct", this.selectedProductId);
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-detail {
  margin-top: 50px;
}
.control-btn{
  display: flex;
  justify-content: space-between;
}
.btn-back-home {
  margin-top: 20px;
  background-color: #17a2b8;
  color: #fff;
  border: none;
  padding: 5px 8px;
  border-radius: 4px;
  transition: 0.3s;
}
.btn-back-home:hover {
  background-color: #1b8697;
}
.btnAddCard {
  margin-top: 20px;
  background-color: #17a2b8;
  color: #fff;
  border: none;
  padding: 5px 8px;
  border-radius: 4px;
  transition: 0.3s;
}
.btnAddCard:hover {
  background-color: #1b8697;
}
</style>

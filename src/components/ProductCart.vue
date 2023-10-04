<template>
  <div>
    <b-col>
      <b-card
        :title="product.title"
        :img-src="product.image"
        img-alt="Image"
        img-top
        tag="article"
        :style="{ maxWidth: '20rem', cursor: 'pointer' }"
        class="mb-2 cart-product"
        @click="detailPage(product.id)"
      >
        <b-card-text>
          {{ product.price }}
          {{ product.category }}
        </b-card-text>
        <button class="btn-add-card" @click.stop="addToCart">
          Add to cart
        </button>
      </b-card>
    </b-col>
  </div>
</template>

<script>
import addCartMixin from "@/mixins/addCartMixin";
import toastMessage from "@/mixins/toastMessage";
export default {
  mixins: [addCartMixin, toastMessage],
  props: {
    product: {
      type: Object,
    },
  },
  methods: {
    detailPage(id) {
      this.$router.push("/detail/" + id);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-add-card {
  background-color: #17a2b8;
  color: #fff;
  border: none;
  padding: 5px 8px;
  border-radius: 4px;
  transition: 0.3s;
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 10px;
}
.btn-add-card:hover {
  background-color: #1b8697;
}
.cart-product {
  height: 500px;
  overflow: hidden;
}
</style>

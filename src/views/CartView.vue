<template>
  <div>
    <b-container class="bv-example-row">
      <b-table-simple small caption-top responsive>
        <caption class="caption">
          <h3>Cart product:</h3>
        </caption>
        <b-thead>
          <b-tr class="text-header">
            <b-th class="text-center">ID</b-th>
            <b-th class="text-center">Title</b-th>
            <b-th>Image</b-th>
            <b-th class="text-center">Price</b-th>
            <b-th class="text-center">Quality</b-th>
            <b-th class="text-center">Delete</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr
            v-for="(product, index) in getListProductCard"
            :key="product.id"
          >
            <b-td>{{ product.id }}</b-td>
            <b-td>{{ product.title }}</b-td>
            <b-td class="ps-img"
              ><img :src="product.image" width="70%" alt="" />
            </b-td>
            <b-td class="text-center"
              >$ {{ (product.price * product.quality).toFixed(2) }}</b-td
            >
            <b-td class="text-center">
              <div class="control-quality">
                <button @click="decrementProduct(index)">
                  <b-icon icon="dash-circle-fill"></b-icon>
                </button>
                <span>{{ product.quality }}</span>
                <button @click="incrementProduct(index)">
                  <b-icon icon="plus-circle-fill"></b-icon>
                </button>
              </div>
            </b-td>
            <b-td class="text-center">
              <button @click="deleteProductCart(index)">
                <b-icon icon="trash-fill"></b-icon>
              </button>
            </b-td>
          </b-tr>
        </b-tbody>
        <b-tfoot>
          <b-tr>
            <b-td colspan="6" class="text-right text-total">
              Total Product: <b>{{ getListProductCard.length }}</b>
            </b-td>
          </b-tr>
        </b-tfoot>
      </b-table-simple>
    </b-container>
  </div>
</template>

<script>
export default {
  methods: {
    incrementProduct(index) {
      this.$store.commit("incrementProduct", index);
    },
    decrementProduct(index) {
      this.$store.commit("decrementProduct", index);
    },
    deleteProductCart(index) {
      this.$store.commit("deleteProductCart", index);
    },
  },
  computed: {
    getListProductCard() {
      return this.$store.getters.getListProductCart;
    },
  },
};
</script>

<style lang="scss" scoped>
.ps-img {
  width: 100px;
}
.caption {
  margin-top: 10px;
  margin-bottom: 10px;
}
.control-quality {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
button {
  border: none;
  padding: 0px 5px;
  background-color: #fff;
  color: #17a2b8;
}
.text-total,
.text-header {
  color: #17a2b8;
}
</style>

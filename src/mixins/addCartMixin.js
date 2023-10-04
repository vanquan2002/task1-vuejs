export default {
  methods: {
    addToCart() {
      this.$store.commit("addToCart", this.product);
      this.makeToast("info", "Product added successfully!");
    },
  },
};

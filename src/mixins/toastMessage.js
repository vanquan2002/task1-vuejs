export default {
  methods: {
    makeToast(variant = null, message) {
      this.$bvToast.toast(message, {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },
  },
};

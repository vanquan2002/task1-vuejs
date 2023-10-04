<template>
  <div class="header">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">
            <b-icon class="" icon="house-fill"></b-icon>
            Home
          </b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <search-product />
          <b-nav-item-dropdown right v-if="userData">
            <template #button-content>
              <em>{{ userData.username }}</em>
            </template>
            <b-dropdown-item @click="logOut" href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item
            id="show-btn"
            @click="$bvModal.show('bv-modal-example')"
            v-else
          >
            <template>
              <em>Login</em>
            </template>
          </b-nav-item>
          <b-modal id="bv-modal-example" hide-footer>
            <template #modal-title> Login </template>
            <div class="d-block">
              <form-logIn
                v-on:close-modal="$bvModal.hide('bv-modal-example')"
              ></form-logIn>
            </div>
            <b-button
              class="mt-3"
              block
              @click="$bvModal.hide('bv-modal-example')"
              >Close Me</b-button
            >
          </b-modal>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-link to="/cart" tag="div" class="btn-card">
      <b-icon class="cart-icon" icon="basket3-fill"></b-icon>
      <div class="cart-number">{{ numberCart }}</div>
    </router-link>
  </div>
</template>

<script>
import SearchProduct from "./SearchProduct.vue";
import FormLogIn from "./FormLogIn.vue";
import toastMessage from "@/mixins/toastMessage";
export default {
  mixins: [toastMessage],
  components: {
    SearchProduct,
    FormLogIn,
  },
  methods: {
    toCart() {
      this.$router.push("/cart");
    },
    logOut() {
      this.$store.commit("logOut");
      this.makeToast("info", "Signed out successfully!");
    },
  },
  computed: {
    numberCart() {
      return this.$store.getters.getNumberCard;
    },
    userData() {
      return this.$store.getters.getUserData;
    },
  },
  created() {
    let storageDataUser = JSON.parse(localStorage.getItem("user"));
    let storageDataCart = JSON.parse(localStorage.getItem("cart"));
    if (storageDataUser) {
      this.$store.commit("setUserData", storageDataUser);
    }
    if (storageDataCart) {
      this.$store.commit("setCartStorage", storageDataCart);
    }
  },
};
</script>

<style lang="scss" scoped>
.btn-card {
  color: #17a2b8;
  display: flex;
  position: fixed;
  bottom: 50px;
  right: 40px;
  z-index: 10;
  cursor: pointer;
  transition: 0.5s;
}
.btn-card:hover {
  opacity: 60%;
}
.cart-icon {
  font-size: 32px;
}
.cart-number {
  position: absolute;
  left: 22px;
  bottom: 23px;
  color: #fff;
  font-size: 12px;
  padding: 1px 7px;
  border-radius: 50%;
  background-color: orange;
  display: flex;
  align-items: center;
}
</style>

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    selectedProductData: {},
    listProductCart: [],
    users: [],
    userData: null,
    isLogIn: false,
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getSelectedProductData(state) {
      return state.selectedProductData;
    },
    getListProductCart(state) {
      return state.listProductCart;
    },
    getNumberCard(state) {
      return state.listProductCart.length;
    },
    getUserData(state) {
      return state.userData;
    },
    getIsLogIn(state) {
      return state.isLogIn;
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    selectedProduct(state, product) {
      state.selectedProductData = product;
    },
    addToCart(state, product) {
      let existingProduct = state.listProductCart.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        existingProduct.quality += 1;
      } else {
        let quality = 1;
        state.listProductCart.push({ ...product, quality });
      }
      this.commit("updateCartAndLocalStorage");
    },
    incrementProduct(state, index) {
      state.listProductCart[index].quality += 1;
      this.commit("updateCartAndLocalStorage");
    },
    decrementProduct(state, index) {
      if (state.listProductCart[index].quality == 1) {
        state.listProductCart.splice(index, 1);
      } else {
        state.listProductCart[index].quality -= 1;
      }
      this.commit("updateCartAndLocalStorage");
    },
    deleteProductCart(state, index) {
      state.listProductCart.splice(index, 1);
      this.commit("updateCartAndLocalStorage");
    },
    updateCartAndLocalStorage(state) {
      if (state.userData) {
        localStorage.setItem("cart", JSON.stringify(state.listProductCart));
      }
    },
    getUsers(state, users) {
      console.log(users);
      state.users = users;
    },
    logOut(state) {
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      state.userData = null;
      state.listProductCart = [];
    },
    logIn(state, user) {
      let userToObject = JSON.parse(user);
      let findUser = state.users.find(
        (item) => item.username == userToObject.userName
      );
      if (findUser) {
        localStorage.setItem("user", JSON.stringify(findUser));
        state.userData = findUser;
        state.isLogIn = true;
      } else {
        state.isLogIn = false;
      }
    },
    setUserData(state, user) {
      state.userData = user;
    },
    setCartStorage(state, cart) {
      state.listProductCart = cart;
    },
  },
  actions: {
    async getProducts({ commit }) {
      try {
        let response = await axios.get("https://fakestoreapi.com/products");
        commit("setProducts", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async selectedProduct({ commit }, id) {
      try {
        let response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        commit("selectedProduct", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getUsers({ commit }) {
      try {
        let response = await axios.get(
          "https://fakestoreapi.com/users?limit=5"
        );
        commit("getUsers", response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
});

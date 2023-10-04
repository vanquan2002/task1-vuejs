<template>
  <div class="box-search">
    <b-nav-form @submit.prevent>
      <input
        size="sm"
        :value="textSearch"
        @input="setTextSearch"
        class="mr-sm-2"
        placeholder="Enter the product you want to search for..."
        ref="focusInput"
      />
    </b-nav-form>
    <div :class="['search-results', objectClass]">
      <ul>
        <li
          v-for="product in filterListProduct"
          :key="product.id"
          @click="closeSearch"
        >
          <router-link tag="div" :to="'/detail/' + product.id"
            >{{ product.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textSearch: "",
      isActive: false,
    };
  },
  methods: {
    setTextSearch(e) {
      this.textSearch = e.target.value;
      if (!e.target.value.length == 0) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    },
    closeSearch() {
      this.textSearch = "";
      this.isActive = false;
      this.$emit("close-modal-search");
    },
  },
  computed: {
    listProduct() {
      return this.$store.getters.getProducts;
    },
    filterListProduct() {
      let searchText = this.textSearch.toLowerCase();
      return this.listProduct.filter((el) => {
        return el.title.toLowerCase().includes(searchText);
      });
    },
    objectClass() {
      return {
        activeSearch: this.isActive,
      };
    },
  },
  created () {
    setTimeout(() => {
      if (this.$refs.focusInput) {
        this.$refs.focusInput.focus();
      }
    }, 100);
  },
};
</script>

<style lang="scss" scoped>
.box-search {
  width: 100%;
  height: 20px;
}
.box-search input {
  position: absolute;
  right: 0;
  left: 0;
  border: none;
  border-bottom: 2px solid #17a2b8;
  outline: none;
  padding: 5px;
  margin: 0 10px;
}
.search-results {
  position: absolute;
  top: 70px;
  right: 0px;
  display: none;
}
.search-results.activeSearch {
  display: block;
}
.search-results ul {
  background-color: #fff;
  border-radius: 5px;
}
.search-results li {
  list-style-type: none;
  color: #666;
  margin-left: -40px;
  padding: 5px 10px;
  cursor: pointer;
}
.search-results li:hover {
  background-color: #17a3b82c;
}
</style>

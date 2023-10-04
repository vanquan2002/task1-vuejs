<template>
  <div class="box-search">
    <b-nav-form @submit.prevent>
      <input
        size="sm"
        :value="textSearch"
        @input="setTextSearch"
        class="mr-sm-2"
        placeholder="Search"
      />
    </b-nav-form>
    <div :class="['search-results', objectClass]">
      <ul>
        <li
          v-for="product in filterListProduct"
          :key="product.id"
          @click="closeSearch"
        >
          <router-link tag="div" :to="'/detail/' + product.id" variant="primary"
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
};
</script>

<style lang="scss" scoped>
.box-search {
  margin-top: 3px;
  margin-right: 10px;
}
.box-search input {
  padding: 4px;
  border: none;
  outline: none;
  border-radius: 3px;
}
.search-results {
  position: absolute;
  margin: 0 20px;
  top: 80px;
  right: 0px;
  max-width: 800px;
  z-index: 20;
  display: none;
}
.search-results.activeSearch {
  display: block;
}
.search-results ul {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 10px #d1d1d1;
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

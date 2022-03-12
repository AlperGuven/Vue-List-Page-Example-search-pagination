<template>
  <b-container fluid>
    <b-overlay :show="loading" rounded="sm" variant="transperent" class="mar-tp-25">
      <b-row>
        <div class="ListOfProducts">
          <div class="ListOfProducts__main">
            <h1 class="ListOfProducts__main__header-element" v-if="!loading">Product List Page</h1>
            <div
              class="ListOfProducts__main__product-card"
              :key="index"
              v-for="(product, index) in searchedProducts"
            >
              <div class="ListOfProducts__main__product-card--item mar-bt-10">
                <!-- <img class="card-img-top" src="dist/img/placeholder-blue-800x600px.png" alt="Card image cap"> -->
                <div class="ListOfProducts__main__product-card--item__body">
                  <p class="ListOfProducts__main__product-card--item__body--title">Product Name: {{ product.title }}</p>
                  <div class="ListOfProducts__main__product-card--item__body--content"
                        :key="index"
                        v-for="(variant, index) in product.variants">
                    <p v-if="index ===0" class="ListOfProducts__main__product-card--item__body--content__price">Product Price: {{ variant.price }}$</p>
                  </div>
                  <div class="ListOfProducts__main__product-card--item__body--content">
                    <div class="ListOfProducts__main__product-card--item__body--content__btn-wrapper">
                      <b-button :id="product.id.toString()" size="sm" variant="outline-light" @click="togglePopover(product)">
                      <span v-if="!product.showPopover">View Detail</span>
                      <span v-else>Close Detail</span>
                      </b-button>
                      <b-popover :show.sync="product.showPopover" :target="product.id.toString()">
                        <template #title>Product Detail</template>
                        <span v-html="product.body_html"></span>
                      </b-popover>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-row>
      <b-row>
        <div class="ProductTools" v-if="!loading">
          <div class="ProductTools__product-search">
            <input type="text" class="form-control" v-model="searchText" placeholder="Search Product"/>
          </div>
            <div class="ProductTools__product-pagination">
              <button
                type="button"
                class="btn btn-sm btn-outline-light"
                @click="negativePageCount"
                :disabled="page === 1"
              >
                Prev
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-light"
                :key="index"
                v-for="(pageNumber, index) in pages"
                @click="page = pageNumber"
              >
                {{ pageNumber }}
              </button>
              <button
                type="button"
                @click="positivePageCount"
                :disabled="page >= pages.length"
                class="btn btn-sm btn-outline-light"
              >
                Next
              </button>
            </div>
        </div>
      </b-row>
    </b-overlay>
  </b-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'List',
  data() {
    const accessToken = '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';
    return {
      products: [],
      baseUrl: 'https://teknasyon.netlify.app/.netlify/functions/products/',
      page: 1,
      perPage: 10,
      pages: [],
      loading: false,
      searchText: '',
      data: {
        headers: {
          'x-access-token': accessToken,
          // 'Access-Control-Allow-Origin': '*',
          // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
          // 'Content-Type': 'application/json'
        },
      },
    };
  },
  methods: {
    setPagesForProducts() {
      let numberOfPages = Math.ceil(this.products.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    getProducts() {
      this.loading = true;
      axios
        .get(this.baseUrl, this.data)
        .then((response) => {
          this.products = response.data.products;
          this.loading = false;
          this.injectProductPopoverBool();
        })
        .catch((response) => {
          console.log('Error: ', response);
        });
    },
    paginate(products) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return products.slice(from, to);
    },
    injectProductPopoverBool() {
      for(let i=0; i < this.products.length; i++) {
        this.products[i].showPopover = false;
      }
    },
    togglePopover(productParam) {
      productParam.showPopover = !productParam.showPopover;
    },
    positivePageCount() {
      this.page++;
    },
    negativePageCount() {
      this.page--;
    },
  },
  created() {
    this.getProducts();
  },
  watch: {
    products() {
      this.setPagesForProducts();
    },
  },
  computed: {
    computedAllProducts() {
      console.log(this.products);
      return this.paginate(this.products);
    },
    searchedProducts() {
      console.log(this.products);
      let tempProducts = this.products;
      
      if (this.searchText != '' && this.searchText) {
          this.page = 1;
          tempProducts = tempProducts.filter((item) => {
            return item.title
              .toUpperCase()
              .includes(this.searchText.toUpperCase())
          })
      }
      return this.paginate(tempProducts);
      }
    },
};
</script>
<style lang="scss" scoped>
@import "../assets/styles/index.scss";
</style>